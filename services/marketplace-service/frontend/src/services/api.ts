import axios from 'axios';
import { Listing, CreateListingData } from '../types/listing.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// For testing - use mock token from env
const MOCK_TOKEN = import.meta.env.VITE_MOCK_TOKEN || 'test-token';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${MOCK_TOKEN}`
  }
});

// Interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const listingService = {
  // Get all listings
  getAllListings: async (): Promise<Listing[]> => {
    const response = await apiClient.get('/listings');
    return response.data.listings;
  },

  // Create new listing
  createListing: async (data: CreateListingData): Promise<Listing> => {
    const response = await apiClient.post('/listings', data);
    return response.data.listing;
  },

  // Get listing by ID
  getListingById: async (id: string): Promise<Listing> => {
    const response = await apiClient.get(`/listings/${id}`);
    return response.data.listing;
  },

  // Get user's listings
  getMyListings: async (): Promise<Listing[]> => {
    const response = await apiClient.get('/listings/my-listings');
    return response.data.listings;
  }
};

export default apiClient;