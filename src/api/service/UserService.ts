const API_URL = "https://sua-api.com";

export default class UserService {
  static async registerUser(data) {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      return {
        status: response.status,
        message: responseData.message,
      };
    } catch (error) {
      throw new Error("Erro ao cadastrar o usuário.");
    }
  }
}