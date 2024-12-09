import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, ScrollView, ToastAndroid, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ProductFooter from "../../components/productFooter";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getOrderItemById, upsertOrderItem } from "../../database/orderItemService";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(true); // Estado para indicador de carregamento
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const item = await getOrderItemById(product.idProduct);
        if (item) {
          setQuantity(item.quantity);
          setObservation(item.observation || "");
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false); // Finaliza o indicador de carregamento
      }
    };
    fetchProductData();
  }, [product.idProduct]);

  const handleAddToCart = async () => {
    try {
      await upsertOrderItem(product.idProduct, quantity, product.price, observation);
      ToastAndroid.show("Produto adicionado ao carrinho!", ToastAndroid.SHORT);
      // Aguarda 1000ms e navega para a aba Home
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      ToastAndroid.show("Erro ao adicionar ao carrinho!", ToastAndroid.LONG);
      console.error(error);
    }
  };

  if (loading) {
    // Exibir indicador de carregamento enquanto os dados são buscados
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando informações...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.urlImage }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.observationContainer}>
          <View style={styles.label}>
            <View style={styles.iconBackground}>
              <Ionicons name="chatbubble" size={15} color="#fff" />
            </View>
            <Text style={styles.labelText}>Alguma observação?</Text>
            <Text style={styles.charCount}>{`${observation.length}/140`}</Text>
          </View>
          <TextInput
            style={styles.observationInput}
            multiline
            maxLength={140}
            placeholder="Ex: tirar cebola, maionese à parte etc."
            value={observation}
            onChangeText={(text) => setObservation(text)}
          />
        </View>
      </ScrollView>
      <ProductFooter
        productId={product.idProduct}
        price={product.price}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCart}
      />
    </SafeAreaView>
  );
}