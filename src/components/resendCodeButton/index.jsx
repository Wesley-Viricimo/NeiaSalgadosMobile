import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import UserService from '../../api/service/UserService';
import { styles } from './styles';

const ResendCodeButton = ({ email }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const resendCode = async () => {
    try {
      const response = await UserService.resendCode(email);
      if (response.status === 200) {
        Alert.alert('Sucesso', 'Código reenviado com sucesso!');
        setTimer(30);  // Resetar o contador
      } else {
        Alert.alert('Erro', 'Erro ao reenviar o código!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao reenviar o código!');
    }
  };

  return (
    <TouchableOpacity onPress={resendCode} disabled={timer > 0} style={styles.resendButton}>
      <Text style={styles.resendText}>
        {timer > 0 ? `Reenviar (${timer}s)` : 'Não recebeu o email? Reenviar'}
      </Text>
    </TouchableOpacity>
  );
};

export default ResendCodeButton;