import AddressModel from "../../model/AddressModel";
import apiClient from "../apiClient";
import TokenService from "./TokenService";

export class AddressService {

    static async fetchUserAddres(page: number) {
        try {
            const token = await TokenService.getToken();

            const options = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                },
              };

              const responseData = await apiClient(`/address/user/all?page=${page}`, options);

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
            console.log('Erro:', error);
            throw new Error(error.message || 'Erro ao buscar endereços');
        }
    }

    static async fetchAddressByCep(cep: number) {
        try {
            const token = await TokenService.getToken();

            const options = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                },
              };

              const responseData = await apiClient(`/address/consultacep/${cep}`, options);

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
            console.log('Erro:', error);
            throw new Error(error.message || 'Erro ao buscar endereços');
        }
    }

    static async createAddress(addressModel: AddressModel) {
        try {
            const token = await TokenService.getToken();

            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                },
                body: JSON.stringify(addressModel)
              };

              const responseData = await apiClient('/address', options);

              console.log('responseData', responseData);

              if(responseData.statusCode === 201) {
                return {
                  data: responseData.data,
                  status: responseData.statusCode
                };
              }

              return {
                message: responseData.message.detail
              }
        } catch (error) {
            console.log('Erro:', error);
            throw new Error(error.message || 'Erro ao buscar endereços');
        }
    }
}