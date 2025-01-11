import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, ScrollView, Animated, StyleSheet, ToastAndroid } from "react-native";
import ProductDetailsFooter from "../components/ProductDetailsFooter";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getOrderItemById, removeOrderItemById, upsertOrderItem } from "../database/orderItemService";
import LoadingAnimation from "../components/LoadingAnimation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ProductDetailsParams } from "@/types/ProductTypes";
import { useRouter } from "expo-router";

type ProductDetailsRouteProp = RouteProp<ProductDetailsParams, "product">;
  
export default function ProductDetails () {
  const [quantity, setQuantity] = useState<number>(1);
  const [observation, setObservation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Opacidade (de 0 a 1)
  const [translateAnim] = useState(new Animated.Value(30)); // Deslocamento (de 30 para 0)

  const route = useRoute<ProductDetailsRouteProp>();
  const router = useRouter();

  const { idProduct, title, description, price, urlImage } = route.params;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const item: any = await getOrderItemById(idProduct);
        if (item) {
          setQuantity(item.quantity); // Sincroniza com soldQuantity
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
  }, [idProduct]);

  const handleAddToCart = async () => {
    try {
      await upsertOrderItem(
        idProduct,
        title,
        quantity,
        price,
        observation
      );
      ToastAndroid.show("Produto adicionado ao carrinho!", ToastAndroid.SHORT);
      router.replace('/(tabs)');
    } catch (error) {
      ToastAndroid.show("Erro ao adicionar ao carrinho!", ToastAndroid.LONG);
      console.error(error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeOrderItemById(idProduct);
      ToastAndroid.show("Produto removido do carrinho!", ToastAndroid.SHORT);
      router.replace('/(tabs)');
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
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <Image source={{ uri: urlImage }} style={styles.image} />
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <Text style={styles.title}>{title}</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <Text style={styles.description}>{description}</Text>
        </Animated.View>

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
              <Text
                style={styles.charCount}
              >{`${observation.length}/140`}</Text>
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

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
        }}
      >
        <ProductDetailsFooter
          price={price}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
          onPressClearIcon={handleRemoveFromCart}
          isInCart={isInCart}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginHorizontal: 16,
    marginBottom: 60,
  },
  observationContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  iconBackground: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "#333", // Fundo escuro
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 8,
    flex: 1,
  },
  charCount: {
    fontSize: 14,
    color: "#999",
  },
  observationInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top", // Garante alinhamento no topo
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
