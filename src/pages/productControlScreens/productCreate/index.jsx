import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "./styles";
import FilePicker from "../../../components/filePicker/index";
import InputField from "../../../components/inputField/index";
import SubmitButton from "../../../components/submitButton/index";
import { useNavigation } from "@react-navigation/native";
import { validateFile } from "../../../utils/fileValidator";
import ProductService from "../../../api/service/ProductService";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductCreate = () => {
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    if (!description || !price) {
      return Alert.alert("Erro", "Campos de descrição e preço são obrigatórios!");
    }
  
    // Validação do tipo de arquivo
    if (!validateFile(file.assets[0].mimeType)) {
      return Alert.alert("Erro", "O tipo do arquivo é inválido!");
    }
  
    try {
      // Preparando o arquivo para envio
      const fileUri = file.assets[0].uri;
      const fileName = file.assets[0].name || 'file.jpg';
      const fileType = file.assets[0].mimeType || 'application/octet-stream';
  
      // Criação do FormData
      const formData = new FormData();
      formData.append("product-image", {
        uri: fileUri,
        name: fileName,
        type: fileType,
      }); // Passando a URI diretamente para o FormData
      formData.append("description", description); // Descrição do produto
      formData.append("price", String(price)); // Preço como string
  
      // Enviar para a API
      const response = await ProductService.createProduct(formData);
  
      if (response.status === 201) {
        Alert.alert(response.message);
        navigation.goBack();
      } else {
        Alert.alert("Erro", response.message || "Erro ao cadastrar o produto.");
      }
    } catch (error) {
      Alert.alert("Erro", error.message || "Erro inesperado.");
    }
  };  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text onPress={() => navigation.goBack()} style={styles.backButton}>
          {"<"}
        </Text>
        <Text style={styles.headerTitle}>Cadastrar Novo Produto</Text>
      </View>
      <View style={styles.body}>
        <FilePicker onFileSelect={setFile} />
        <View style={styles.filePreview}>
          {file ? (
            <Text style={styles.fileName}>{file.assets[0].name}</Text>
          ) : (
            <Text style={styles.filePlaceholder}>Nenhuma imagem selecionada</Text>
          )}
        </View>
        <InputField
          placeholder="Descrição do produto"
          value={description}
          onChangeText={setDescription}
        />
        <InputField
          placeholder="Preço do produto"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <SubmitButton title="Cadastrar Produto" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );  
};

export default ProductCreate;