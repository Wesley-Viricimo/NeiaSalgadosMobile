import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { StyleSheet } from "react-native";

interface FilePickerProps {
    onFileSelect: (file: DocumentPicker.DocumentPickerResult) => void;
}

const FilePicker = ({ onFileSelect }: FilePickerProps) => {
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpeg", "image/jpg"],
    });

    onFileSelect(result); // Retorna o arquivo selecionado
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickFile} style={styles.button}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#007BFF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default FilePicker;