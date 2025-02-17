import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import CustomInput from '@/components/CustomInput';
import PasswordInput from '@/components/PasswordInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserService from '@/api/service/UserService';
import UserModel from '@/model/UserModel';
import { useRouter } from 'expo-router';
import { colors, fonts, spacing } from '@/global/styles';

export default function UserRegistration() {
    const router = useRouter();

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
                router.replace({
                    pathname: "/confirmationCode",
                    params: { 
                        email 
                    }
                });
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
                {/* Título sem animação */}
                <Text style={styles.header}>
                    Cadastro de Usuário
                </Text>

                {/* Inputs sem animação */}
                <CustomInput label="Nome" value={name} onChangeText={setName} icon="person" />
                <CustomInput label="Como gostaria de ser chamado" value={surname} onChangeText={setSurname} icon="happy" />
                <CustomInput label="CPF" value={cpf} onChangeText={setCpf} icon="document-text" />
                <CustomInput label="Telefone" value={phone} onChangeText={setPhone} icon="call" />
                <CustomInput label="Email" value={email} onChangeText={setEmail} icon="mail" keyboardType="email-address" />
                <PasswordInput label="Senha" value={password} onChangeText={setPassword} />
                <PasswordInput label="Confirmação de Senha" value={confirmPassword} onChangeText={setConfirmPassword} />

                {/* Botão de cadastro */}
                <TouchableOpacity
                    style={[styles.registerButton, isLoading && styles.disabledButton]}
                    onPress={handleRegister}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#0000ff" />
                    ) : (
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    )}
                </TouchableOpacity>

                {/* Botão de cancelamento */}
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
} 

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      padding: spacing.large,
    },
    header: {
      fontSize: 25,
      color: colors.primary,
      fontFamily: fonts.bold,
      marginBottom: spacing.large,
      textAlign: 'center'
    },
    registerButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: spacing.medium,
      marginTop: spacing.large,
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: '#aaa', // Pode ser uma cor mais clara do tema
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: fonts.bold,
    },
    cancelText: {
      color: colors.error,
      fontSize: 16,
      fontFamily: fonts.regular,
      marginTop: spacing.medium,
      textAlign: 'center',
    },
  });