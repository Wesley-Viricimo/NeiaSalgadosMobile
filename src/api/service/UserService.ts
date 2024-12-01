import UserModel from "../../model/UserModel";
import VerifyCodeModel from "../../model/VerifyCodeModel";
import apiClient from "../apiClient";

export default class UserService {

  static async registerUser(userModel: UserModel) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userModel)
      };

      const responseData = await apiClient(`/user`, options);

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
      throw new Error("Erro ao cadastrar o usuário.");
    }
  }

  static async verifyCode(verifyCodeModel: VerifyCodeModel) {
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(verifyCodeModel)
      };

      const responseData = await apiClient(`/user/confirm-code`, options);

      console.log('response data', responseData);
      
      if(responseData.statusCode === 200) {
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
      throw new Error("Erro ao ativar conta!");
    }
  }
}