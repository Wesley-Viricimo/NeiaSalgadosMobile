import apiClient from '../apiClient';
import LoginModel from '../../model/LoginModel';
import LoginResponse from '../response/LoginResponse';

const login = async (loginModel: LoginModel) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginModel.email,
                password: loginModel.password,
            }),
        };

        const response = await apiClient('/auth', options); 
        
        if(response.message.summary == "Unauthorized") {
            return response.message.detail; 
        }

        return new LoginResponse(response.data.userId, response.data.name, response.data.role, response.data.token);
    } catch (error: any) {
        console.log('Erro:', error);
        throw error.message || 'Erro ao realizar login';
    }
};

export default login;