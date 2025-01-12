import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface AddressCardProps {
    address: {
        type: string;
        road: string;
        number: string;
        district: string;
        city: string;
        state: string;
        complement?: string;
    };
    isClickable: boolean;
    onSelect?: (address: any) => void;
}

const AddressCard = ({ address, isClickable, onSelect }: AddressCardProps) => {
  const { type, road, number, district, city, state, complement } = address;

  // Função para renderizar o ícone baseado no tipo de endereço
  const renderAddressIcon = () => {
    return type === "casa" ? (
      <Ionicons name="home" size={24} color="#000" />
    ) : type === "trabalho" ? (
      <Ionicons name="construct" size={24} color="#000" />
    ) : (
      <Ionicons name="home-sharp" size={24} color="#000" />
    );
  };

  // Se o card for clicável, envolva com TouchableOpacity
  const CardContent = (
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>{renderAddressIcon()}</View>
      <View style={styles.addressDetails}>
        <Text style={styles.addressType}>
          {type === "casa" ? "Casa" : "Trabalho"}
        </Text>
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
  <TouchableOpacity style={styles.card} onPress={() => onSelect && onSelect(address)} >
    {CardContent}
  </TouchableOpacity>
) : (
  <View style={styles.card}>{CardContent}</View>
);

};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: "#ffffff", // Fundo branco para destacar o card
    borderRadius: 10, // Cantos mais arredondados
    shadowColor: "#000", // Sombra suave para destaque
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Para sombra no Android
    padding: 20, // Maior espaço interno
    marginHorizontal: 15, // Espaçamento lateral
    minHeight: 140, // Altura mínima ajustada
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 20, // Maior espaço entre o ícone e os detalhes
    justifyContent: "center",
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontWeight: "bold",
    fontSize: 20, // Fonte maior para o tipo do endereço
    color: "#2c3e50", // Cor mais moderna
    marginBottom: 8,
  },
  addressText: {
    fontSize: 17,
    color: "#7f8c8d", // Cor mais suave para o texto
    marginBottom: 6,
  },
});

export default AddressCard;
