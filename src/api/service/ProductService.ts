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

  static async createProduct(productModel: ProductModel) {
    try {
      const token = await TokenService.getToken(); // Obtemos o token diretamente aqui
  
      // Acessando o primeiro item do array 'assets' para pegar os dados do arquivo
      const fileAsset = productModel.file.assets[0]; 
  
      // Extraindo as propriedades necessárias
      const fileUri = fileAsset.uri;
      const fileName = fileAsset.name || 'file.jpg';
      const fileType = fileAsset.mimeType || 'application/octet-stream';
  
      // Carregar o arquivo como Blob
      const fileBlob = await fetch(fileUri)
        .then(res => res.blob())
        .catch((error) => {
          console.error('Erro ao carregar o arquivo:', error);
          throw new Error("Erro ao carregar o arquivo.");
        });
  
      // Criação do FormData
      const formData = new FormData();
      formData.append("file", fileBlob, fileName); // Passando o Blob como arquivo
      formData.append("description", productModel.description); // Descrição do produto
      formData.append("price", String(productModel.price)); // Convertendo price para string
  
      // Configurações da requisição
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token, // Usamos o token obtido pela função `getToken`
        },
        body: formData, // FormData já cuida do Content-Type correto
      };
  
      // Enviar requisição
      const response = await apiClient(`/product`, options);
      const responseData = await response.json();
  
      console.log('Response:', responseData);
  
      return {
        status: response.status,
        data: responseData,
      };
    } catch (error) {
      console.error("Erro ao realizar requisição:", error);
      throw new Error("Erro na comunicação com a API.");
    }
  }
    
}

// Exporte a classe ProductService
export default ProductService;