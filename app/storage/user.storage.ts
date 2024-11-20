import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user_data';

// Função para salvar os dados do usuário
export const saveUserData = async (data: { token: string; id: string; name: string }) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
  }
};

// Função para recuperar os dados do usuário
export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao recuperar dados do usuário:', error);
    return null;
  }
};

// Função para remover os dados do usuário
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Erro ao remover dados do usuário:', error);
  }
};