import React from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

export default function ProductFooter({
  price,
  quantity,
  setQuantity,
  onAddToCart,
  onPressClearIcon,
  isInCart, // Novo prop
}) {
  
  const total = price * quantity;

  return (
    <View style={styles.container}>
      <View style={styles.quantityBox}>
        <TouchableOpacity onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
          <Text style={styles.icon}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity((q) => q + 1)}>
          <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
        <Text style={styles.addButtonText}>Adicionar R$ {total.toFixed(2)}</Text>
      </TouchableOpacity>
      {isInCart && ( // Condicional para exibir o ícone somente se o produto já estiver no carrinho
        <TouchableOpacity style={styles.trashIcon} onPress={onPressClearIcon}>
          <Ionicons name="trash-outline" size={24} color="#FF0000" />
        </TouchableOpacity>
      )}
    </View>
  );
}