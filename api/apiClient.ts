import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

const apiClient = async (endpoint: string, options: RequestInit) => {
  const fullUrl = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const responseError = await response.json();
      return responseError;
    }

    try {
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Erro ao interpretar JSON:", error);
      throw new Error("Resposta não é um JSON válido.");
    }
  } catch (error) {
    console.error("Erro ao realizar requisição:", error);
    throw new Error("Erro na comunicação com a API.");
  }
};

export default apiClient;
