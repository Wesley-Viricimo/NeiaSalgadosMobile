import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { styles } from "./styles";

const FilePicker = ({ onFileSelect }) => {
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      mimeType: ["image/png", "image/jpeg", "image/jpg"],
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

export default FilePicker;