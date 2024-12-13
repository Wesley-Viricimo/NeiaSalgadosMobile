import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

const ProductCard = ({ product, onPress, soldQuantity }) => {
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

export default ProductCard;