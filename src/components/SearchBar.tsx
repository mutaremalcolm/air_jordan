import React, { useState } from 'react';

const SearchBar: React.FC<{
    setLat: React.Dispatch<React.SetStateAction<number | undefined>>;
    setLon: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ setLat, setLon }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setSearchQuery(input);

        // API call to MapBox Geocoding API for autocomplete suggestions
        const apiKey = 'pk.eyJ1IjoicmVkbGlvbjk1IiwiYSI6ImNsbTd0b2RydjAyamIzZGxidWg4azc3eDcifQ.niHxh5TLu_CUQZL-JMSLGA';
        const autocompleteUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${apiKey}&autocomplete=true&limits=5`;

        fetch(autocompleteUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.features) {
                    const suggestions = data.features.map((feature: any) => feature.place_name);
                    setSuggestions(suggestions);
                } else {
                    setSuggestions([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching autocomplete suggestions', error);
                setSuggestions([]);
            });
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchQuery(suggestion);
        setSuggestions([]); //Clear Suggestions
        // Fetch coordinates for the selected suggestion
        fetchCoordinatesForSuggestion(suggestion);
    };

    const fetchCoordinatesForSuggestion = (selectedSuggestion: string) => {
        // API call fails when keys are stored in .env
        const apiKey = 'pk.eyJ1IjoicmVkbGlvbjk1IiwiYSI6ImNsbTd0b2RydjAyamIzZGxidWg4azc3eDcifQ.niHxh5TLu_CUQZL-JMSLGA';
        const coordinatesUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${selectedSuggestion}.json?access_token=${apiKey}&limit=1`;

        fetch(coordinatesUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.features && data.features.length > 0) {
                    const coordinates = data.features[0].center;
                    if (coordinates.length >= 2) {
                        // MapBox provides latitudes and longitude in reverse order
                        setLon(coordinates[0]);
                        setLat(coordinates[1]);
                    }
                }
            })
            .catch((error) => {
                console.error('Error fetching coordinates for selected suggestion:', error);
            });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission if needed
    };

    return (
        <form onSubmit={handleSubmit} className='z-30 w-full relative'>
            <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only'>Search</label>
            <div className='relative'>
                {/* TODO: resolve search icon bug */}
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-event-none'>
                    <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' >
                        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/>
                    </svg>
                </div>
                <input 
                    type='search'
                    id='default-search'
                    className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus: ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Search...'
                    autoComplete='off'
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type='submit' className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Search</button>
            </div>
            {suggestions.length > 0 && (
                <ul className='absolute z-10 mt-2 py-2 bg-white border border-gray-300 rounded-lg w-full'>
                    {suggestions.map((suggestion, index) => (
                        <li 
                            key={index}
                            className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;