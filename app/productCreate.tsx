import React, { useState, useEffect } from "react";
import { View, Text, Alert, Animated, StyleSheet } from "react-native";
import FilePicker from "@/components/FilePicker";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import CategoryPicker from "@/components/CategoryPicker";
import { useNavigation } from "@react-navigation/native";
import { validateFile } from "@/utils/fileValidator";
import ProductService from "@/api/service/ProductService";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";

const ProductCreate = () => {
  const navigation = useNavigation();
  const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | null>(
    null
  );
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

    if (!file || !file.assets || !file.assets[0]) {
      return Alert.alert("Erro", "Nenhum arquivo selecionado!");
    }

    const mimeType = file.assets[0].mimeType;

    if (!mimeType || !validateFile(mimeType)) {
      return Alert.alert(
        "Erro",
        "O tipo do arquivo é inválido ou não foi selecionado!"
      );
    }

    try {
      const fileUri = file.assets[0].uri;
      const fileName = file.assets[0].name || "file.jpg";
      const fileType = file.assets[0].mimeType || "application/octet-stream";

      const fileBlob = {
        uri: fileUri,
        name: fileName,
        type: fileType,
      };

      const formData = new FormData();
      formData.append("product-image", {
        uri: fileUri,
        name: fileName,
        type: fileType,
      } as any);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", String(price));
      formData.append("idCategory", selectedCategory);

      const response = await ProductService.createProduct(formData);

      if (response.status === 201) {
        Alert.alert(
          "Sucesso",
          response.message || "Produto cadastrado com sucesso!"
        );
        navigation.goBack();
      } else {
        Alert.alert("Erro", response.message || "Erro ao cadastrar o produto.");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro", error.message || "Erro inesperado.");
      }
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
            <Text style={styles.fileName}>
              {file.assets && file.assets[0]
                ? file.assets[0].name
                : "Nenhuma imagem selecionada"}
            </Text>
          ) : (
            <Text style={styles.filePlaceholder}>
              Nenhuma imagem selecionada
            </Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
    color: "#007BFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  filePreview: {
    marginVertical: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
  },
  fileName: {
    fontSize: 16,
    color: "#333",
  },
  filePlaceholder: {
    fontSize: 14,
    color: "#AAA",
  },
});

export default ProductCreate;
