import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";  

interface OrderItemCardProps {
    description: string;
    quantity: number;
    price: number;
    onRemove: () => void;
}

const OrderItemCard = ({ description, quantity, price, onRemove }: OrderItemCardProps) => {
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
        <Ionicons name="trash" size={20} color="#e74c3c" />
        <Text style={orderItemCardStyles.removeText}>Remover produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const orderItemCardStyles = StyleSheet.create({
    orderItemCard: {
      backgroundColor: "#f9f9f9", 
      padding: 15,
      marginBottom: 12,
      borderRadius: 12, 
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10, 
      shadowOffset: { width: 0, height: 5 },
      elevation: 4, 
    },
    orderItemDescription: {
      fontSize: 18, 
      fontWeight: "bold",
      color: "#2c3e50",  
      marginBottom: 6, 
    },
    orderItemDetails: {
      fontSize: 14,
      color: "#7f8c8d",
      marginTop: 3,
    },
    removeButton: {
      flexDirection: "row",  
      alignItems: "center", 
      marginTop: 20,
    },
    removeText: {
      fontSize: 14,
      color: "#e74c3c",
      textDecorationLine: "underline", 
      fontWeight: "bold", 
      marginLeft: 5, 
    },
   
  });

export default OrderItemCard;