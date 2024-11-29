import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "./styles";
import FilePicker from "../../components/filePicker/index";
import InputField from "../../components/inputField/index";
import SubmitButton from "../../components/submitButton/index";
import { useNavigation } from "@react-navigation/native";
import { validateFile } from "../../utils/fileValidator";
import ProductService from "../../api/service/ProductService";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductModel from "../../model/ProductModel";

const ProductCreate = () => {
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    if (!file || !description || !price) {
      return Alert.alert("Erro", "Todos os campos são obrigatórios!");
    }

    if (!validateFile(file.assets[0].mimeType)) {
      return Alert.alert("Erro", "O tipo do arquivo é inválido!");
    }

    try {
      const response = await ProductService.createProduct(new ProductModel(file, description, price));

      if (response.status === 201) {
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", response.data.message || "Erro ao cadastrar o produto.");
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