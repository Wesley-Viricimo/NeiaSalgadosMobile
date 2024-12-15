// components/OrderItemCard.js

import React from "react";
import { View, Text } from "react-native";
import { orderItemCardStyles } from "./styles"; // Importando os estilos

const OrderItemCard = ({ description, quantity, price }) => {
  return (
    <View style={orderItemCardStyles.orderItemCard}>
      <Text style={orderItemCardStyles.orderItemDescription}>{description}</Text>
      <Text style={orderItemCardStyles.orderItemDetails}>Qtd: {quantity}</Text>
      <Text style={orderItemCardStyles.orderItemDetails}>Preço: R$ {price.toFixed(2)}</Text>
    </View>
  );
};

export default OrderItemCard;
