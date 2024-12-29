import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Loading from '../../components/Loading';
import LoginService from '../../api/service/LoginService';
import LoginModel from '../../model/LoginModel';
import LoginResponse from '../../api/response/LoginResponse';
import UserStorage from '../../service/userStorage.service';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import PasswordInput from '../../components/passwordInput';
import CustomInput from '../../components/customInput';
import * as Notifications from "expo-notifications";  // Importar expo-notifications

export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const userStorge = new UserStorage();

    // Função para obter o token de push e enviar para a API
    const registerForPushNotificationsAsync = async () => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                alert("Falha ao obter permissão para notificações!");
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync({
                projectId: 'dc3085fd-ddd4-4403-9841-1cd7e16ba489',
              })).data;
            console.log("Expo Push Token:", token);

            // Enviar o token para a API (exemplo de requisição)
            await fetch('https://sua-api.com/api/save-push-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    userId: userStorge.getUserData().id, // Enviar o ID do usuário armazenado
                }),
            });
        } catch (error) {
            console.error("Erro ao obter o token de push:", error);
        }
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            if (email && password) {
                const data = await LoginService.login(new LoginModel(email, password));
                if (data instanceof LoginResponse) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'BottomRoutes' }], // Navegação após login
                    });
                    userStorge.saveUserData({ id: data.id, name: data.name, role: data.role, token: data.token });

                    // Após o login, registre o token de push
                    await registerForPushNotificationsAsync();  // Registra e envia o token
                } else {
                    Alert.alert('Erro', data);
                }
            } else {
                Alert.alert('Erro', `Email e senha devem ser fornecidos!`);
            }
        } catch (error) {
            Alert.alert('Erro', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <CustomInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                icon="person"
            />

            <PasswordInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
            />

            {/* Texto Esqueceu sua senha */}
            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.linkText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            {/* Botão de Login */}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? <Loading /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>

            {/* Texto para Cadastro */}
            <TouchableOpacity onPress={() => navigation.navigate('UserRegistration')}>
                <Text style={styles.linkText}>Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
};