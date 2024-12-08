import React from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import { styles } from "./styles";
import { removeOrderItemById } from "../../database/orderItemService";
import { Ionicons } from "@expo/vector-icons";

export default function ProductFooter({
  productId,
  price,
  quantity,
  setQuantity,
  onAddToCart,
}) {
  const total = price * quantity;

  const handleRemoveFromCart = async () => {
    await removeOrderItemById(productId);
    ToastAndroid.show("Produto removido do carrinho!", ToastAndroid.SHORT);
  };

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
      <TouchableOpacity style={styles.trashIcon} onPress={handleRemoveFromCart}>
        <Ionicons name="trash-outline" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );
}