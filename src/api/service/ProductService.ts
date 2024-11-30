import ProductModel from '../../model/ProductModel';
import apiClient from '../apiClient';
import ProductResponse from '../response/ProductResponse';
import TokenService from './TokenService';

class ProductService {
  // Método estático para buscar produtos
  static async fetchProducts(title = '', page = 1): Promise<ProductResponse[]> {
    try {
      const token = await TokenService.getToken(); // Obtemos o token diretamente aqui

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Usamos o token obtido pela função `getToken`
        },
      };

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
  }

  static async createProduct(formData: FormData) {
    try {
      const token = await TokenService.getToken();
  
      const options = {
        method: 'POST',
        headers: {
          'Authorization': token,
        },
        body: formData,
      };
  
      const responseData = await apiClient(`/product`, options);

      if(responseData.statusCode === 201) {
        return {
          status: responseData.statusCode, // Defina explicitamente o status esperado
          message: responseData.message.detail
        };
      }

      return {
        message: responseData.message.detail
      };
      
    } catch (error) {
      console.error("Erro ao realizar requisição:", error.message);
      throw new Error(error.message || "Erro na comunicação com a API.");
    }
  }  
}

// Exporte a classe ProductService
export default ProductService;