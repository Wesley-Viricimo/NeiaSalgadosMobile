import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

interface SubmitButtonProps {
    title: string;
    onPress: () => void;
}

const SubmitButton = ({ title, onPress }: SubmitButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      alignItems: "center",
    },
    button: {
      backgroundColor: "#28A745",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
    },
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default SubmitButton;