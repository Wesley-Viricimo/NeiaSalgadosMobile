import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Definindo o tipo para o objeto `product`
interface Product {
  title?: string;
  description?: string;
  price?: number;
  urlImage?: string;
}

// Definindo o tipo das propriedades do componente
interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  soldQuantity: number;
}

const ProductCard = ({ product, onPress, soldQuantity }: ProductCardProps) => {
  const { title = "Sem título", description = "Sem descrição", price = 0, urlImage = "" } = product;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image source={{ uri: urlImage }} style={styles.image} />
      {soldQuantity > 0 && (
        <View style={styles.soldIndicator}>
          <Ionicons name="cart" size={16} color="#fff" />
          <Text style={styles.quantity}>{soldQuantity}</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 10,
    height: 150,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
  },
  image: {
    width: 150,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  soldIndicator: {
    position: "absolute",
    top: 12,
    right: 8,
    backgroundColor: "#363636",
    borderRadius: 12,
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E90FF",
    textAlign: "right",
  },
});

export default ProductCard;
