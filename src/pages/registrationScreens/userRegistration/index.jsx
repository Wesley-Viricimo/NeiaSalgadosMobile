import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Animated } from 'react-native';
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

    // Animações
    const fadeAnim = new Animated.Value(0);  // Opacidade inicial 0 (invisível)
    const slideAnim = new Animated.Value(30);  // Posição inicial (fora da tela)

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

    // Função para animar a entrada dos componentes
    useEffect(() => {
        // Animação de fade e slide logo após o componente ser montado
        Animated.timing(fadeAnim, {
          toValue: 1, // Alvo da opacidade
          duration: 1000, // Duração da animação
          useNativeDriver: true, // Utiliza a aceleração de hardware para uma animação mais fluida
        }).start();
    
        Animated.timing(slideAnim, {
          toValue: 0, // Alvo da posição
          duration: 700, // Duração da animação
          useNativeDriver: true, // Utiliza a aceleração de hardware para uma animação mais fluida
        }).start();
      }, []); // Apenas uma vez quando o componente for montado

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Animação de entrada */}
                <Animated.Text style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    Cadastro de Usuário
                </Animated.Text>

                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    <CustomInput
                        label="Nome"
                        value={name}
                        onChangeText={setName}
                        icon="person"
                    />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    <CustomInput
                        label="Como gostaria de ser chamado"
                        value={surname}
                        onChangeText={setSurname}
                        icon="happy"
                    />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    <CustomInput
                        label="CPF"
                        value={cpf}
                        onChangeText={setCpf}
                        icon="document-text"
                    />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    <CustomInput
                        label="Telefone"
                        value={phone}
                        onChangeText={setPhone}
                        icon="call"
                    />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    <CustomInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        icon="mail"
                        keyboardType="email-address"
                    />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    <PasswordInput
                        label="Senha"
                        value={password}
                        onChangeText={setPassword}
                    />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    <PasswordInput
                        label="Confirmação de Senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </Animated.View>

                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
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
                </Animated.View>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}