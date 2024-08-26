
import {FETCH_CLIENT_ID , API_BASE_URL , API_VERSION} from "../utils/constants";

export const fetchData = async (tenant , endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${tenant}${API_VERSION}${endpoint}`);
    const status = response.status;
    const responseBody = response.ok ? await response.json() : await response.text();
    return {
      status,
      data: response.ok ? responseBody : null,
      error: response.ok ? null : responseBody
    };
    if (!response.ok) { 
        if (response.status === 404) {
            throw new Error('404 Not Found');
        }
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    // Handle error
    console.error('API call error:', error);
    throw error;
  }
};

export const fetchDataWithToken = async (tenant, endpoint, token, methodtype,data = null ) => {
  try {
    const response = await fetch(`${API_BASE_URL}${tenant}${API_VERSION}${endpoint}`, {
      method: methodtype,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api+json',
      },
      body: data ? JSON.stringify(data) : null,
    });

    // Extract response details
    const status = response.status;
    const responseBody = response.ok ? await response.json() : await response.text();
    
    // Return both status and response body
    return {
      status,
      data: response.ok ? responseBody : null,
      error: response.ok ? null : responseBody
    };
  } catch (error) {
    // Handle network or other errors
    console.error('API call error:', error);
    return {
      status: null,
      data: null,
      error: error.message
    };
  }
};