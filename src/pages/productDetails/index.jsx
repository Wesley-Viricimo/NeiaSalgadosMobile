import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import ProductFooter from "../../components/productFooter";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getOrderItemById, upsertOrderItem } from "../../database/orderItemService";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState("");
  const route = useRoute();
  const { product } = route.params;

  useEffect(() => {
    const fetchProductData = async () => {
      const item = await getOrderItemById(product.idProduct);
      if (item) {
        setQuantity(item.quantity);
        setObservation(item.observation || "");
      }
    };
    fetchProductData();
  }, [product.idProduct]);

  const handleAddToCart = async () => {
    try {
      await upsertOrderItem(product.idProduct, quantity, product.price, observation);
      ToastAndroid.show("Produto adicionado ao carrinho!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Erro ao adicionar ao carrinho!", ToastAndroid.LONG);
      console.error(error);
    }
  };

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