import ResendCodeModel from "@/model/ResendCodeModel";
import UserModel from "@/model/UserModel";
import VerifyCodeModel from "@/model/VerifyCodeModel";
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
          status: responseData.statusCode, 
          message: responseData.message.detail
        };
      }

      return {
        message: responseData.message.detail
      };

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro ao cadastrar usuário');
      } else {
        throw new Error('Erro desconhecido ao cadastrar usuário');
      }
    }
  }

  static async verifyCode(verifyCodeModel: VerifyCodeModel) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(verifyCodeModel)
      };

      const responseData = await apiClient(`/user/confirm-code`, options);

      if(responseData.statusCode === 200) {
        return {
          status: responseData.statusCode, 
          message: responseData.message.detail
        };
      }

      return {
        message: responseData.message.detail
      };

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro ao enviar código de verificação');
      } else {
        throw new Error('Erro desconhecido ao enviar código de verificação');
      }
    }
  }

  static async resendCode(resendCodeModel: ResendCodeModel) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resendCodeModel)
      };

      const responseData = await apiClient(`/user/resend-confirm-code`, options);

      if(responseData.statusCode === 200) {
        return {
          status: responseData.statusCode,
          message: responseData.message.detail
        };
      }

      return {
        message: responseData.message.detail
      };

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro ao reenviar código de verificação');
      } else {
        throw new Error('Erro desconhecido ao reenviar código de verificação');
      }
    }
  }
}