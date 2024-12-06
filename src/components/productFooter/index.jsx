import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function ProductFooter({ price, quantity, setQuantity }) {
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
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar R$ {total.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );
}