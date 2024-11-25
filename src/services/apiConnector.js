import axios from "axios";

export const axiosInstance = axios.create({
  // You can add default settings here, like baseURL or timeout
});

export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData || null,
      headers: headers || null,
      params: params || null,
    });
    return response; // Return the response for successful requests
  } catch (error) {
    // Improved error handling
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response:', error.response);
      throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      // No response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from the server.');
    } else {
      // Something went wrong in setting up the request
      console.error('Error message:', error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
};
