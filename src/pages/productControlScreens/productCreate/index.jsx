import React, { useState, useEffect } from "react";
import { View, Text, Alert, Animated } from "react-native";
import { styles } from "./styles";
import FilePicker from "../../../components/filePicker/index";
import InputField from "../../../components/inputField/index";
import SubmitButton from "../../../components/submitButton/index";
import CategoryPicker from "../../../components/categoryPicker/index";
import { useNavigation } from "@react-navigation/native";
import { validateFile } from "../../../utils/fileValidator";
import ProductService from "../../../api/service/ProductService";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductCreate = () => {
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Estados de animação
  const [fadeAnim] = useState(new Animated.Value(0)); // Opacidade inicial
  const [slideAnim] = useState(new Animated.Value(30)); // Deslocamento inicial

  useEffect(() => {
    // Inicia a animação ao montar o componente
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Opacidade final
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Posição final
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = async () => {
    if (!description || !price || !selectedCategory) {
      return Alert.alert(
        "Erro",
        "Campos de descrição, preço e categoria são obrigatórios!"
      );
    }

    if (!file || !validateFile(file.assets[0].mimeType)) {
      return Alert.alert("Erro", "O tipo do arquivo é inválido ou não foi selecionado!");
    }

    try {
      const fileUri = file.assets[0].uri;
      const fileName = file.assets[0].name || "file.jpg";
      const fileType = file.assets[0].mimeType || "application/octet-stream";

      const formData = new FormData();
      formData.append("product-image", {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("idCategory", selectedCategory);

      const response = await ProductService.createProduct(formData);

      if (response.status === 201) {
        Alert.alert("Sucesso", response.message || "Produto cadastrado com sucesso!");
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
      {/* Header animado */}
      <Animated.View
        style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text onPress={() => navigation.goBack()} style={styles.backButton}>
          {"<"}
        </Text>
        <Text style={styles.headerTitle}>Cadastrar Novo Produto</Text>
      </Animated.View>

      {/* Corpo animado */}
      <Animated.View
        style={[
          styles.body,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <FilePicker onFileSelect={setFile} />
        <View style={styles.filePreview}>
          {file ? (
            <Text style={styles.fileName}>{file.assets[0].name}</Text>
          ) : (
            <Text style={styles.filePlaceholder}>Nenhuma imagem selecionada</Text>
          )}
        </View>
        <CategoryPicker
          selectedCategory={selectedCategory}
          onValueChange={setSelectedCategory}
        />
        <InputField
          placeholder="Título do produto"
          value={title}
          onChangeText={setTitle}
        />
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
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProductCreate;