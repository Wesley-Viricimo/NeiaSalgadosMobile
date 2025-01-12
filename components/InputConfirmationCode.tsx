import React, { forwardRef } from "react";
import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native";

interface InputConfirmationCodeProps {
  value: string;
  onChange: (text: string) => void;
  onKeyPress: (key: string) => void;
}

const InputConfirmationCode = forwardRef<TextInput, InputConfirmationCodeProps>(
    ({ value, onChange, onKeyPress }, ref) => {
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
  }
);

const styles = StyleSheet.create({
  inputFieldContainer: {
    flex: 1,
    margin: 5,
  },
  inputField: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
  },
});

export default InputConfirmationCode;
