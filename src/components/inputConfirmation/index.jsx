import React, { forwardRef } from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';

const InputField = forwardRef(({ value, onChange, onKeyPress }, ref) => {
  return (
    <View style={styles.inputFieldContainer}>
      <TextInput
        ref={ref}
        style={styles.inputField}
        value={value}
        maxLength={1} // Limita a 1 caractere
        keyboardType="default" // Pode ser ajustado para "numeric" se necessário
        onChangeText={onChange} // Dispara ao digitar
        onKeyPress={({ nativeEvent }) => onKeyPress(nativeEvent.key)} // Detecta teclas pressionadas
        autoCapitalize="characters" // Força o teclado a digitar em maiúsculas
      />
    </View>
  );
});

export default InputField;