import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import ProductService from "../../api/service/ProductService";

const CategoryPicker = ({ selectedCategory, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [showProgress, setShowProgress] = useState(false); // Controle para exibir o indicador de progresso

  const fetchCategories = async () => {
    setLoadingCategories(true);
    setShowProgress(true);
    try {
      const response = await ProductService.getCategories();
      if (response.status === 200) {
        setCategories(response.data);
        setShowProgress(false);
      } else {
        Alert.alert("Erro", "Não foi possível carregar as categorias.");
        setShowProgress(false);
      }
    } catch (error) {
      Alert.alert("Erro", error.message || "Erro ao buscar categorias.");
      setShowProgress(false);
    } finally {
      setLoadingCategories(false);
    }
  };

  const openPicker = () => {
    setModalVisible(true);
    fetchCategories(); // Chama a API para buscar categorias
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.pickerButton} onPress={openPicker}>
        <Text style={styles.pickerText}>
          {selectedCategory
            ? categories.find((cat) => cat.idCategory === selectedCategory)
                ?.description || "Selecione uma categoria"
            : "Selecione uma categoria"}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma categoria</Text>
            {showProgress ? (
              <ActivityIndicator size="large" color="#007BFF" />
            ) : (
              <FlatList
                data={categories}
                keyExtractor={(item) => item.idCategory.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => {
                      onValueChange(item.idCategory);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.categoryText}>{item.description}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoryPicker;