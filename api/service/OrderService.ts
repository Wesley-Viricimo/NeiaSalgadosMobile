import FinishOrderModel from "@/model/FinishOrderModel";
import apiClient from "../apiClient";
import TokenService from "@/service/TokenService";

export class OrderService {

  static async getAdditionals() {
    try {
      const token = await TokenService.getToken();

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
      };

      const responseData = await apiClient(`/additional`, options);

      if (responseData.statusCode === 200) {
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
        throw new Error(error.message || 'Erro ao buscar adicionais');
      } else {
        throw new Error('Erro desconhecido ao buscar adicionais');
      }
    }
  }

  static async createOrder(finishOrderModel: FinishOrderModel) {
    try {
      const token = await TokenService.getToken();

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(finishOrderModel)
      };

      const responseData = await apiClient('/order', options);

      if (responseData.statusCode === 201) {
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
        throw new Error(error.message || 'Erro ao realizar pedido');
      } else {
        throw new Error('Erro desconhecido ao realizar pedido');
      }
    }
  }
}