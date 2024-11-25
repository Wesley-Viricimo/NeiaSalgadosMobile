import apiClient from '../apiClient';
import ProductResponse from '../response/ProductResponse';

export const fetchProducts = async (title = '', page = 1, token = ''): Promise<ProductResponse[]> => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }

    const response = await apiClient(`/product?title=${encodeURIComponent(title)}&page=${page}&perPage=10`, options);

    if (response.message?.summary === "Unauthorized") {
      return Promise.reject(response.message.detail);
    }

    const responseProductsList: ProductResponse[] = [];

    for (const prd of response.data) {
      const product = new ProductResponse(prd.idProduct, prd.description, prd.price, prd.urlImage);
      responseProductsList.push(product);
    }

    return responseProductsList;
  } catch (error: any) {
    console.log('Erro:', error);
    throw new Error(error.message || 'Erro ao buscar produtos');
  }
};
