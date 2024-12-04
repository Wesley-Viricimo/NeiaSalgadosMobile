import React from "react";
import { TextInput, View } from "react-native";
import { styles } from "./styles";
const InputField = ({ placeholder, value, onChangeText, keyboardType = "default" }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};
export default InputField;