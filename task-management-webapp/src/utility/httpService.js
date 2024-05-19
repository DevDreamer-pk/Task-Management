import axios from "axios";

export default class HTTPService {

    constructor(baseURL, config={}){
        this.instance = axios.create({ baseURL, ...config });
        this.instance.interceptors.response.use(
            (response) => {
                if (!response.data.success) {
                    return Promise.reject(response.data);
                  }
                  return response.data;
            },
            (error) => {
                return Promise.reject(error);
              }
        );
    }

     /**
   * Make a GET request to the API.
   *
   * @param {string} endpoint - The endpoint to call
   * @param {Object} params - Query parameters to include in the request
   * @param {Object} config - Axios request configuration
   * @returns {Promise} Promise that resolves with the API response
   */
  get = async (endpoint, params = {}, config = {}) => {
    try {
      const response = await this.instance.get(endpoint, { ...config, params });
      return response;
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error;
    }
  };

  /**
   * Make a POST request to the API.
   *
   * @param {string} endpoint - The endpoint to make the request to
   * @param {Object} data - The data to send in the request body
   * @param {Object} config - Additional Axios request configuration
   * @returns {Promise} Promise that resolves with the API response
   */
  post = async (endpoint, data = {}, config = {}) => {
    try {
      const response = await this.instance.post(endpoint, data, config);
      return response;
    } catch (error) {
      console.error("Error making POST request:", error);
      throw error;
    }
  };

  /**
   * Make a PUT request to the API.
   *
   * @param {string} endpoint - The endpoint to make the request to
   * @param {Object} data - The data to send in the request body
   * @param {Object} config - Additional Axios request configuration
   * @returns {Promise} Promise that resolves with the API response
   */
  put = async (endpoint, data = {}, config = {}) => {
    try {
      const response = await this.instance.put(endpoint, data, config);
      return response;
    } catch (error) {
      console.error("Error making PUT request:", error);
      throw error;
    }
  };

  /**
   * Make a PATCH request to the API.
   *
   * @param {string} endpoint - The endpoint to make the request to
   * @param {Object} data - The data to send in the request body
   * @param {Object} config - Additional Axios request configuration
   * @returns {Promise} Promise that resolves with the API response
   */
  patch = async (endpoint, data = {}, config = {}) => {
    try {
      const response = await this.instance.patch(endpoint, data, config);
      return response;
    } catch (error) {
      console.error("Error making PATCH request:", error);
      throw error;
    }
  };

  /**
   * Make a DELETE request to the API.
   *
   * @param {string} endpoint - The endpoint to make the request to
   * @param {Object} data - The data to send in the request body
   * @param {Object} config - Additional Axios request configuration
   * @returns {Promise} Promise that resolves with the API response
   */
  delete = async (endpoint, data = {}, config = {}) => {
    try {
      const response = await this.instance.delete(endpoint, {
        data,
        ...config
      });
      return response;
    } catch (error) {
      console.error("Error making DELETE request:", error);
      throw error;
    }
  };

}