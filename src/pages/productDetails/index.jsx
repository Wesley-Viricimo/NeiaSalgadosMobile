import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid,
  Animated,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import ProductFooter from "../../components/productFooter";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getOrderItemById, removeOrderItemById, upsertOrderItem } from "../../database/orderItemService";
import LoadingAnimation from "../../components/loadingAnimation";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState("");
  const [loading, setLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Opacidade (de 0 a 1)
  const [translateAnim] = useState(new Animated.Value(30)); // Deslocamento (de 30 para 0)

  const route = useRoute();
  const navigation = useNavigation();
  const { product, soldQuantity, onAddToCart } = route.params;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const item = await getOrderItemById(product.idProduct);
        if (item) {
          setQuantity(item.quantity || soldQuantity); // Sincroniza com soldQuantity
          setObservation(item.observation || "");
          setIsInCart(true); // Produto já está no carrinho
        } else {
          setIsInCart(false); // Produto ainda não está no carrinho
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();

    // Animação de fade e translação para os componentes após o carregamento inicial
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [product.idProduct]);

  const handleAddToCart = async () => {
    try {
      await upsertOrderItem(product.idProduct, product.title, quantity, product.price, observation);
      onAddToCart(product.idProduct, quantity); // Atualiza estado de produtos vendidos na Home
      ToastAndroid.show("Produto adicionado ao carrinho!", ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.goBack();
      }, 1200);
    } catch (error) {
      ToastAndroid.show("Erro ao adicionar ao carrinho!", ToastAndroid.LONG);
      console.error(error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeOrderItemById(product.idProduct);
      onAddToCart(product.idProduct, 0);
      ToastAndroid.show("Produto removido do carrinho!", ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.goBack();
      }, 1200);
    } catch (error) {
      ToastAndroid.show("Erro ao remover o produto!", ToastAndroid.LONG);
      console.error(error);
    }
  };

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Animação de fade e translação na imagem do produto */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <Image source={{ uri: product.urlImage }} style={styles.image} />
        </Animated.View>

        {/* Animação de fade e translação no título do produto */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <Text style={styles.title}>{product.title}</Text>
        </Animated.View>

        {/* Animação de fade e translação na descrição do produto */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <Text style={styles.description}>{product.description}</Text>
        </Animated.View>

        {/* Animação de fade e translação na seção de observações */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
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
        </Animated.View>
      </ScrollView>

      {/* Rodapé com animação de fade e translação */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
        }}
      >
        <ProductFooter
          price={product.price}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
          onPressClearIcon={handleRemoveFromCart}
          isInCart={isInCart} // Novo prop
        />
      </Animated.View>
    </SafeAreaView>
  );
}