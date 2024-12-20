import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";

const AddressCard = ({ address, isClickable, onSelect }) => {
  const { type, road, number, district, city, state, complement } = address;

  // Função para renderizar o ícone baseado no tipo de endereço
  const renderAddressIcon = () => {
    return type === "casa" ? (
      <Icon name="home" size={24} color="#000" />
    ) : type === "trabalho" ? (
      <Icon name="work" size={24} color="#000" />
    ) : null;
  };

  // Se o card for clicável, envolva com TouchableOpacity
  const CardContent = (
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>{renderAddressIcon()}</View>
      <View style={styles.addressDetails}>
        <Text style={styles.addressType}>{type === "casa" ? "Casa" : "Trabalho"}</Text>
        <Text style={styles.addressText}>
          {road}, {number}
        </Text>
        <Text style={styles.addressText}>
          {district}, {city} - {state}
        </Text>
        {complement && <Text style={styles.addressText}>{complement}</Text>}
      </View>
    </View>
  );

  return isClickable ? (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(address)}>
      {CardContent}
    </TouchableOpacity>
  ) : (
    <View style={styles.card}>{CardContent}</View>
  );
};

export default AddressCard;