/**
 * API service for making requests to the backend
 */

// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch data from the root endpoint
 * @returns Promise with the response data
 */
export async function fetchHelloWorld(): Promise<{ Hello: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
