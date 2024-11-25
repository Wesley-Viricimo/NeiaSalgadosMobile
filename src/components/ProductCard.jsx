import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductCard = ({ product }) => {
  const { description = "Sem descrição", price = 0, urlImage = "" } = product;

  return (
    <View style={styles.card}>
      <Image source={{ uri: urlImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{description}</Text>
        <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginBottom: 8,
    height: 120,
    padding: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: 150,
    height: "100%",
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E90FF",
  },
});

export default ProductCard;