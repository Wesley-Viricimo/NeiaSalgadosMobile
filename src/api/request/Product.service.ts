import ProductModel from '../../model/ProductModel';
import UserStorage from '../../storage/user.storage';
import apiClient from '../apiClient';
import ProductResponse from '../response/ProductResponse';

class ProductService {
  static async fetchProducts(title = '', page = 1, token = ''): Promise<ProductResponse[]> {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Corrigir o erro de ponto e vírgula (;) em vez de vírgula (,)
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

  // Método estático para criar um produto
  static async createProduct(productModel: ProductModel) {
    try {
      const file = productModel.file;

      // Verificar se estamos no ambiente de React Native e se file tem a propriedade `uri`
      let fileUri = '';
      if ((file as any).uri) {
        // Se tiver uri, estamos no React Native
        fileUri = (file as any).uri;
      } else {
        // Caso contrário, usar o nome do arquivo diretamente (caso seja um `File` no navegador)
        fileUri = (file as any).name || '';
      }

      const fileName = file.name || 'file.jpg'; // Nome do arquivo

      // Carregar o arquivo e convertê-lo para um Blob, se necessário (para React Native)
      const fileBlob = await fetch(fileUri)
        .then(res => res.blob())
        .catch(error => {
          console.error('Erro ao carregar o arquivo:', error);
          throw new Error("Erro ao carregar o arquivo.");
        });

      // Criar FormData e adicionar os campos
      const formData = new FormData();
      formData.append("file", fileBlob, fileName); // Passando o arquivo como Blob
      formData.append("description", productModel.description); // Descrição do produto
      formData.append("price", String(productModel.price)); // Convertendo price para string

      // Enviar requisição
      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': 'colocar token', // Aqui você pode colocar o token da maneira que preferir
        },
        body: formData,
      };

      const response = await apiClient(`/product`, options);
      const responseData = await response.json();

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