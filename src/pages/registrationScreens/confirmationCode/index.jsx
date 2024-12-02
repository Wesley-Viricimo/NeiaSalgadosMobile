import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import InputField from '../../../components/inputConfirmation/index';
import ResendCodeButton from '../../../components/resendCodeButton/index';
import { styles } from './styles';
import UserService from '../../../api/service/UserService';
import VerifyCodeModel from '../../../model/VerifyCodeModel';

export default function ConfirmationCode({ route, navigation }) {
  const { email } = route.params; // Pega o email da tela anterior
  const [code, setCode] = useState(Array(5).fill('')); // Array para armazenar os dígitos do código
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]); // Referências para os campos de entrada

  const handleCodeSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await UserService.verifyCode(new VerifyCodeModel(email, code.join('')));
      if (response.status === 200) {
        Alert.alert('Sucesso', response.message);
        navigation.reset({ index: 0, routes: [{ name: 'Login' }]
        });
      } else {
        Alert.alert('Erro', response.message);
        setCode(Array(5).fill('')); // Limpa os campos
        inputRefs.current[0]?.focus(); // Volta para o primeiro campo
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao verificar o código!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitChange = (digit, index) => {
    const newCode = [...code];
    newCode[index] = digit.toUpperCase();
    setCode(newCode);

    // Move para o próximo campo automaticamente
    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Um código de confirmação foi enviado para o email {email}, insira o código nos campos abaixo para ativar a conta.
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <InputField
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)} // Atribui referência ao campo
            value={digit}
            onChange={(text) => handleDigitChange(text, index)}
            onKeyPress={(key) => handleKeyPress(key, index)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleCodeSubmit} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Confirmar</Text>}
      </TouchableOpacity>
      <ResendCodeButton email={email} />
    </View>
  );
}