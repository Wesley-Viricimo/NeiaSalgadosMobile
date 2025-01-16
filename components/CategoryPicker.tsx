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
import ProductService from "@/api/service/ProductService";
import { StyleSheet } from "react-native";

interface CategoryPickerProps {
    selectedCategory: string;
    onValueChange: (value: string) => void;
}

interface Category {
    idCategory: string;
    description: string;
}

const CategoryPicker = ({ selectedCategory, onValueChange }: CategoryPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

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
      if (error instanceof Error) {
        Alert.alert("Erro", error.message || "Erro ao buscar categorias.");
      } else {
        Alert.alert("Erro", "Erro ao buscar categorias.");
      }
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  pickerButton: {
    height: 55,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 10,
  },
  pickerText: {
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default CategoryPicker;
