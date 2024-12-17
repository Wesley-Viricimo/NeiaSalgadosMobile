import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { orderItemCardStyles } from "./styles"; // Importando os estilos
import { Ionicons } from "react-native-vector-icons"; // Importando os ícones da biblioteca

const OrderItemCard = ({ description, quantity, price, onRemove }) => {
  const subTotal = quantity * price;

  return (
    <View style={orderItemCardStyles.orderItemCard}>
      <Text style={orderItemCardStyles.orderItemDescription}>{description}</Text>
      <Text style={orderItemCardStyles.orderItemDetails}>Qtd: {quantity}</Text>
      <Text style={orderItemCardStyles.orderItemDetails}>Preço unitário: {price.toFixed(2)}</Text>
      <Text style={orderItemCardStyles.orderItemDetails}>
        Subtotal dos itens: R$ {subTotal.toFixed(2)}
      </Text>

      <TouchableOpacity onPress={onRemove} style={orderItemCardStyles.removeButton}>
        <Ionicons name="trash" size={20} color="#e74c3c" style={orderItemCardStyles.icon} />
        <Text style={orderItemCardStyles.removeText}>Remover produto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderItemCard;