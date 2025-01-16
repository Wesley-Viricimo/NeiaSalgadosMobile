import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user_data';

class UserStorage {

    // Função para salvar os dados do usuário
    saveUserData = async (data: {id: string; name: string; role: string; token: string }) => {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao salvar dados do usuário:', error);
        }
    };

    // Função para recuperar os dados do usuário
    getUserData = async () => {
        try {
            const data = await AsyncStorage.getItem(USER_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Erro ao recuperar dados do usuário:', error);
            return null;
        }
    };

    // Função para remover os dados do usuário
    removeUserData = async () => {
        try {
            await AsyncStorage.removeItem(USER_KEY);
        } catch (error) {
            console.error('Erro ao remover dados do usuário:', error);
        }
    };
}

export default UserStorage;