import React from "react";
import { View, Text, StyleSheet } from "react-native";
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

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 15,
        marginHorizontal: 10,
    },
    cardContent: {
        flexDirection: "row", // Ícone e detalhes do endereço lado a lado
        alignItems: "center", // Alinha tudo ao centro verticalmente
    },
    iconContainer: {
        marginRight: 15, // Espaço entre o ícone e as informações
        justifyContent: "center", // Alinha o ícone verticalmente no centro
    },
    addressDetails: {
        flex: 1, // As informações do endereço ocupam o restante do espaço
    },
    addressType: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#333",
        marginBottom: 5, // Espaçamento entre o tipo de endereço e as informações
    },
    addressText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 5, // Espaçamento entre as linhas do endereço
    },
});

export default AddressCard;