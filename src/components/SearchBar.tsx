import React, { useState, useCallback } from 'react';
import debounce from 'lodash/debounce'

interface SearchBarProps {
    setLat: React.Dispatch<React.SetStateAction<number | undefined>>;
    setLon: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface MapboxFeature {
    place_name: string;
    center: [number, number];
}

const SearchBar: React.FC<SearchBarProps> = ({ setLat, setLon }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
    const [error, setError] = useState<string | null>(null);

    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN;

    const fetchSuggestions = useCallback(
        debounce(async (input: string) => {
            if (!MAPBOX_TOKEN) {
                setError('Mapbox token is not configured');
                return;
            }

            if (!input.trim()) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                        input
                    )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.features) {
                    setSuggestions(data.features);
                    setError(null);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setError('Failed to fetch location suggestions');
                setSuggestions([]);
            }
        }, 300),
        [MAPBOX_TOKEN]
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setSearchQuery(input);
        setError(null);
        fetchSuggestions(input);
    };

    const handleSuggestionClick = (suggestion: MapboxFeature) => {
        setSearchQuery(suggestion.place_name);
        setSuggestions([]);
        const [longitude, latitude] = suggestion.center;
        setLon(longitude);
        setLat(latitude);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (suggestions.length > 0) {
            handleSuggestionClick(suggestions[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="z-30 w-full relative">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                Search location
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg 
                        className="w-4 h-4 text-gray-500 dark:text-gray-400" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 20 20"
                    >
                        <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input 
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for a location..."
                    autoComplete="off"
                    value={searchQuery}
                    onChange={handleInputChange}
                    aria-label="Search locations"
                />
                <button 
                    type="submit" 
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button>
            </div>
            
            {error && (
                <div className="mt-2 text-red-500 text-sm">{error}</div>
            )}
            
            {suggestions.length > 0 && (
                <ul className="absolute z-10 mt-2 py-2 bg-white border border-gray-300 rounded-lg w-full shadow-lg dark:bg-gray-700 dark:border-gray-600">
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;