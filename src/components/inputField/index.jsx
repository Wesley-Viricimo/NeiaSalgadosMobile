import React, { useRef } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles'; // Estilos do componente

export default function InputField({ value, onChange, index, onFocus, onBlur }) {
  const inputRef = useRef(null);

  const handleChange = (newValue) => {
    onChange(newValue);

    // Mover para o próximo campo quando o valor for preenchido e não for o último campo
    if (newValue && inputRef.current && index < 4) {
      const nextInput = inputRef.current?.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    // Se pressionar "Backspace" e o campo estiver vazio, move para o campo anterior
    if (nativeEvent.key === 'Backspace' && !value && index > 0) {
      const previousInput = inputRef.current?.previousElementSibling;
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  return (
    <View style={styles.inputFieldContainer}>
      <TextInput
        ref={inputRef}
        style={styles.inputField}
        value={value}
        maxLength={1}
        onChangeText={handleChange}
        onKeyPress={handleKeyPress}
        keyboardType="numeric"  // Ajustado para aceitar apenas números
        onFocus={onFocus}       // Foco no campo (se necessário)
        onBlur={onBlur}         // Garante o foco correto ao perder o foco
      />
    </View>
  );
}