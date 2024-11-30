import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "./styles";

const SubmitButton = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;