import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../../components/Loading';
import login from '../../api/request/loginApi';
import LoginModel from '../../model/LoginModel';
import LoginResponse from '../../api/response/LoginResponse';
import UserStorage from '../../storage/user.storage';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userStorge = new UserStorage();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            if (email && password) {
                const data = await login(new LoginModel(email, password));
                if (data instanceof LoginResponse) {
                    navigation.navigate("BottomRoutes");
                    userStorge.saveUserData({ id: data.id, name: data.name, role: data.role, token: data.token })
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
            {/* Campo de Email */}
            <View style={styles.inputContainer}>
                <Ionicons name="person" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* Campo de Senha */}
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}
                >
                    <Ionicons
                        name={isPasswordVisible ? 'eye-off' : 'eye'}
                        size={20}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>

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
            <TouchableOpacity>
                <Text style={styles.linkText}>Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
};