import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import debounce from 'lodash/debounce';

// Mock lodash debounce to execute immediately in tests
vi.mock('lodash/debounce', () => {
  return {
    default: (fn: Function) => fn,
  };
});

describe('SearchBar Component', () => {
  const mockSetLat = vi.fn();
  const mockSetLon = vi.fn();
  
  // Mock fetch for testing
  const mockFetch = vi.fn();
  global.fetch = mockFetch;
  
  // Mock API response
  const mockSuggestions = {
    features: [
      {
        place_name: 'New York, NY, USA',
        center: [-74.0060, 40.7128],
      },
      {
        place_name: 'Newark, NJ, USA',
        center: [-74.1724, 40.7357],
      },
    ],
  };
  
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Setup default mock response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockSuggestions,
    });
    
    // Mock environment variable
    vi.stubEnv('NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN', 'mock_token');
  });
  
  afterEach(() => {
    vi.unstubAllEnvs();
  });
  
  it('renders search input and button', () => {
    render(<SearchBar setLat={mockSetLat} setLon={mockSetLon} />);
    
    expect(screen.getByPlaceholderText('Search for a location...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  
  it('handles input change and fetches suggestions', async () => {
    render(<SearchBar setLat={mockSetLat} setLon={mockSetLon} />);
    
    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'New York' } });
    
    // Wait for the API call
    // await waitFor(() => {
    //   expect(mockFetch).toHaveBeenCalledWith(
    //     expect.stringContaining('/https:\/\/api\.mapbox\.com\/geocoding\/v5\/mapbox\.places\/New.*\.json/'),
    //     expect.any(Object)
    //   );
    // });
    
    // Check if suggestions are displayed
    await waitFor(() => {
      expect(screen.getByText('New York, NY, USA')).toBeInTheDocument();
      expect(screen.getByText('Newark, NJ, USA')).toBeInTheDocument();
    });
  });
  
  it('handles suggestion click', async () => {
    render(<SearchBar setLat={mockSetLat} setLon={mockSetLon} />);
    
    // Type in the search box
    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'New York' } });
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('New York, NY, USA')).toBeInTheDocument();
    });
    
    // Click on a suggestion
    fireEvent.click(screen.getByText('New York, NY, USA'));
    
    // Check if setLat and setLon were called with the correct values
    expect(mockSetLon).toHaveBeenCalledWith(-74.0060);
    expect(mockSetLat).toHaveBeenCalledWith(40.7128);
    
    // Check if input value was updated
    expect(input).toHaveValue('New York, NY, USA');
    
    // Check if suggestions list is no longer displayed
    expect(screen.queryByText('Newark, NJ, USA')).not.toBeInTheDocument();
  });
  
  it('handles form submission with first suggestion', async () => {
    render(<SearchBar setLat={mockSetLat} setLon={mockSetLon} />);
    
    // Type in the search box
    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'New York' } });
    
    // Wait for suggestions to load
    await waitFor(() => {
      expect(screen.getByText('New York, NY, USA')).toBeInTheDocument();
    });
    
    // Get the form (the parent of the input)
    const form = input.closest('form');
    form && fireEvent.submit(form);
    
    // Verify the first suggestion's coordinates were used
    expect(mockSetLon).toHaveBeenCalledWith(-74.0060);
    expect(mockSetLat).toHaveBeenCalledWith(40.7128);
  });
  
  it('shows an error when API call fails', async () => {
    // Override the mock to simulate an error
    mockFetch.mockRejectedValue(new Error('API error'));
    
    render(<SearchBar setLat={mockSetLat} setLon={mockSetLon} />);
    
    // Type in the search box
    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'New York' } });
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch location suggestions')).toBeInTheDocument();
    });
  });
  
  it('shows an error when Mapbox token is not configured', async () => {
    // Remove the environment variable
    vi.unstubAllEnvs();
    
    render(<SearchBar setLat={mockSetLat} setLon={mockSetLon} />);
    
    // Type in the search box
    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'New York' } });
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Mapbox token is not configured')).toBeInTheDocument();
    });
  });
  
  it('clears suggestions when input is empty', async () => {
    render(<SearchBar setLat={mockSetLat} setLon={mockSetLon} />);
    
    // First type something to get suggestions
    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'New York' } });
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('New York, NY, USA')).toBeInTheDocument();
    });
    
    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    
    // Check that suggestions are removed
    await waitFor(() => {
      expect(screen.queryByText('New York, NY, USA')).not.toBeInTheDocument();
    });
  });
  
  it('handles non-OK response from API', async () => {
    // Override the mock to simulate a non-OK response
    mockFetch.mockResolvedValue({
      ok: false,
      status: 403,
    });
    
    render(<SearchBar setLat={mockSetLat} setLon={mockSetLon} />);
    
    // Type in the search box
    const input = screen.getByPlaceholderText('Search for a location...');
    fireEvent.change(input, { target: { value: 'New York' } });
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch location suggestions')).toBeInTheDocument();
    });
  });
});