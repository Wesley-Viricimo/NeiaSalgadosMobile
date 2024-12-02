import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import CustomInput from '../../../components/customInput/index';
import PasswordInput from '../../../components/passwordInput/index';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserService from '../../../api/service/UserService';
import UserModel from '../../../model/UserModel';

export default function UserRegistration() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !surname || !cpf || !phone || !email || !password || !confirmPassword) {
            return Alert.alert('Erro', 'Todos os campos são obrigatórios!');
        }

        if (password !== confirmPassword) {
            return Alert.alert('Erro', 'As senhas não estão combinando.');
        }

        setIsLoading(true); // Inicia o indicador de carregamento
        try {
            const response = await UserService.registerUser(new UserModel(name, surname, cpf, phone, email, password));
            if (response.status === 201) {
                navigation.navigate('ConfirmationCode', { email: email });
            } else {
                Alert.alert('Erro', response.message || 'Erro ao cadastrar usuário.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro inesperado ao cadastrar usuário.');
        } finally {
            setIsLoading(false); // Finaliza o indicador de carregamento
        }
    };

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Cadastro de Usuário</Text>

                <CustomInput
                    label="Nome"
                    value={name}
                    onChangeText={setName}
                    icon="person"
                />
                <CustomInput
                    label="Como gostaria de ser chamado"
                    value={surname}
                    onChangeText={setSurname}
                    icon="happy"
                />
                <CustomInput
                    label="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    icon="document-text"
                />
                <CustomInput
                    label="Telefone"
                    value={phone}
                    onChangeText={setPhone}
                    icon="call"
                />
                <CustomInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    icon="mail"
                    keyboardType="email-address"
                />
                <PasswordInput
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                />
                <PasswordInput
                    label="Confirmação de Senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                    style={[styles.registerButton, isLoading && styles.disabledButton]}
                    onPress={handleRegister}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}