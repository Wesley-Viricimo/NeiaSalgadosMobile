import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import UserService from '../../api/service/UserService';
import { styles } from './styles';
import ResendCodeModel from '../../model/ResendCodeModel';

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
      const response = await UserService.resendCode(new ResendCodeModel(email));
      if (response.status === 200) {
        Alert.alert('Sucesso', response.message);
        setTimer(30);  // Resetar o contador
      } else {
        Alert.alert('Erro', response.message);
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