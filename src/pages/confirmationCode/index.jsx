import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import InputField from '../../components/inputConfirmation/index';
import ResendCodeButton from '../../components/resendCodeButton/index';
import { styles } from './styles';
import UserService from '../../api/service/UserService'; // Importar a API de serviço para o código

export default function ConfirmationCode({ route, navigation }) {
  const { email } = route.params;  // Pega o email da tela anterior

  const [code, setCode] = useState(Array(5).fill(''));  // Array de 5 caracteres para o código
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await UserService.verifyCode(email, code.join(''));
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Conta ativada com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', 'Código incorreto!');
        setCode(Array(5).fill(''));  // Limpar os campos
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao verificar o código!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Um código de confirmação foi enviado para o email {email}, insira o código nos campos abaixo para ativar a conta</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <InputField 
            key={index} 
            index={index}
            value={digit} 
            onChange={(newValue) => {
              let newCode = [...code];
              newCode[index] = newValue;
              setCode(newCode);
            }}
            onFocus={() => setCode((prevCode) => {
              const newCode = [...prevCode];
              newCode[index] = '';
              return newCode;
            })}
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