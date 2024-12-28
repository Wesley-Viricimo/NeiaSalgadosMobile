import UserStorage from '../../service/userStorage.service';

class TokenService {
  // Variável estática para armazenar o token em memória
  private static cachedToken: string | null = null;

  // Método estático para buscar o token (com cache em memória)
  static async getToken(): Promise<string> {
    // Verificar se o token já está armazenado em memória
    if (this.cachedToken) {
      return this.cachedToken; // Retorna o token armazenado em memória
    }

    try {
      const userStorage = new UserStorage();
      const userData = await userStorage.getUserData();
      this.cachedToken = userData.token; // Armazenamos o token em memória
      return this.cachedToken; // Retorna o token recuperado e armazenado
    } catch (error) {
      console.error('Erro ao obter token:', error);
      throw new Error('Erro ao recuperar token');
    }
  }

  // Método estático para limpar o token armazenado em memória
  static clearToken(): void {
    this.cachedToken = null; // Limpa o token em memória
  }
}

export default TokenService;
