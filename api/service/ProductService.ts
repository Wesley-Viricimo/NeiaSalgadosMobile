import apiClient from '../apiClient';
import ProductResponse from '@/api/response/ProductResponse';
import TokenService from '@/service/TokenService';

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
        return response;
      }

      const responseProductsList: ProductResponse[] = [];

      for (const prd of response.data) {
        const product = new ProductResponse(prd.idProduct, prd.title, prd.description, prd.price, prd.urlImage);
        responseProductsList.push(product);
      }

      return responseProductsList;
    } catch (error: any) {
      console.log('Erro:', error);
      throw new Error(error.message || 'Erro ao buscar produtos');
    }
  }

  static async getCategories() {
    try {
      const token = await TokenService.getToken();

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      };

      const responseData = await apiClient(`/category`, options);

      if(responseData.statusCode === 200) {
        return {
          data: responseData.data,
          status: responseData.statusCode
        };
      }

      return {
        message: responseData.message.detail
      }
      
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro ao buscar categorias');
      } else {
        throw new Error('Erro desconhecido ao buscar categorias');
      }
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
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro cadastrar produto');
      } else {
        throw new Error('Erro desconhecido ao cadastrar produto');
      }
    }
  }  
}

export default ProductService;