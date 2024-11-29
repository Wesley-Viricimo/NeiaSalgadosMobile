import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const apiClient = async (endpoint: string, options: RequestInit) => {
  const fullUrl = `${API_URL}${endpoint}`;
  console.log('full url', fullUrl)

  const response = await fetch(fullUrl, options);
  return response.json();
};

export default apiClient;
