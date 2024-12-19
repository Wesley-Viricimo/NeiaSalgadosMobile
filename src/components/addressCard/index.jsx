import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

const AddressCard = ({ address }) => {
    const { type, road, number, district, city, state, complement } = address;

    // Função para renderizar o ícone baseado no tipo de endereço
    const renderAddressIcon = () => {
        return type === "casa" ? (
            <Icon name="home" size={24} color="#000" />
        ) : type === "trabalho" ? (
            <Icon name="work" size={24} color="#000" />
        ) : null;
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {/* Ícone centralizado à esquerda */}
                <View style={styles.iconContainer}>
                    {renderAddressIcon()}
                </View>

                {/* Informações do endereço à direita */}
                <View style={styles.addressDetails}>
                    {/* Tipo de endereço no topo */}
                    <Text style={styles.addressType}>{type === "casa" ? "Casa" : "Trabalho"}</Text>

                    {/* As informações de endereço abaixo do tipo */}
                    <Text style={styles.addressText}>{road}, {number}</Text>
                    <Text style={styles.addressText}>{district}, {city} - {state}</Text>
                    {complement && <Text style={styles.addressText}>{complement}</Text>}
                </View>
            </View>
        </View>
    );
};

export default AddressCard;