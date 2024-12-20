import UserStorage from '../../storage/user.storage';

class UserIdService {
  // Variável estática para armazenar o id em memória
  private static cachedId: string | null = null;

  // Método estático para buscar o id (com cache em memória)
  static async getUserId(): Promise<string> {
    // Verificar se o id já está armazenado em memória
    if (this.cachedId) {
      return this.cachedId; // Retorna o id armazenado em memória
    }

    try {
      const userStorage = new UserStorage();
      const userData = await userStorage.getUserData();
      this.cachedId = userData.id; // Armazenamos o id em memória
      return this.cachedId; // Retorna o id recuperado e armazenado
    } catch (error) {
      console.error('Erro ao obter id:', error);
      throw new Error('Erro ao recuperar id');
    }
  }

  // Método estático para limpar o id armazenado em memória
  static clearUserId() {
    this.cachedId = null; // Limpa o id em memória
  }
}

export default UserIdService
