import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Definindo os tipos das props
interface ProductDetailsFooterProps {
  price: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onAddToCart: () => void;
  onPressClearIcon: () => void;
  isInCart: boolean;
}

const ProductDetailsFooter= ({
  price,
  quantity,
  setQuantity,
  onAddToCart,
  onPressClearIcon,
  isInCart,
}: ProductDetailsFooterProps) => {
  const total = price * quantity;

  return (
    <View style={styles.container}>
      <View style={styles.quantityBox}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
          <Text style={styles.icon}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
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
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Garante alinhamento vertical
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 30,
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#28a745",
    borderRadius: 5,
    paddingLeft: 40,
    paddingRight: 40,
    padding: 12,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  trashIcon: {
    marginLeft: 16, // Espaço para separar do botão de adicionar
  },
});

export default ProductDetailsFooter;