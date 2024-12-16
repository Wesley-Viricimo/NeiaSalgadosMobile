import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { sumOrderItemQuantities } from "../../database/orderItemService";

export default function FinishOrderFooter() {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigation = useNavigation();

    const fetchTotalQuantityAndPrice = async () => {
        try {
            const result = await sumOrderItemQuantities();
            if (!isNaN(result.totalQuantity)) {
                setTotalQuantity(result.totalQuantity);
            } else {
                setTotalQuantity(0);
            }

            if (!isNaN(result.totalPrice)) {
                setTotalPrice(result.totalPrice);
            } else {
                setTotalPrice(0);
            }
        } catch (error) {
            console.error("Erro ao buscar dados do pedido:", error);
        }
    };

    useEffect(() => {
        fetchTotalQuantityAndPrice();
        const unsubscribe = navigation.addListener("focus", fetchTotalQuantityAndPrice); // Atualiza ao focar
        return unsubscribe;
    }, [navigation]);

    // Não renderizar o rodapé se a quantidade for 0
    if (totalQuantity <= 0) {
        return null;
    }

    return (
        <View style={styles.footerContainer}>
            <View style={styles.iconContainer}>
                <Icon name="shopping-cart" size={24} color="#fff" />
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalQuantity}</Text>
                </View>
            </View>

            {/* Exibindo "Total R$: {totalPrice}" dentro de um componente Text */}
            <Text style={styles.footerText}>
                {"Total R$: " + totalPrice.toFixed(2)}
            </Text>

            {/* Botão "Ver Carrinho" com o texto dentro de um componente Text */}
            <TouchableOpacity 
                style={styles.cartButton}
                onPress={() => navigation.navigate("FinishOrder")}> 
                <Text style={styles.cartButtonText}>Ver Carrinho</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E90FF",
        padding: 15,
        zIndex: 10,
    },
    iconContainer: {
        marginRight: 15,
        position: "relative",
    },
    badge: {
        position: "absolute",
        top: -5,
        right: -10,
        backgroundColor: "#FF4500",
        borderRadius: 10,
        paddingHorizontal: 5,
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
    },
    footerText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    cartButton: {
        marginLeft: 30,
        backgroundColor: "#FF4500",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    cartButtonText: {
        color: "#fff",
        fontSize: 14,
    },
});