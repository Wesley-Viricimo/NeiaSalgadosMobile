import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { sumOrderItemQuantities } from "../../database/orderItemService";

export default function TabFooter() {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const navigation = useNavigation();

    const fetchTotalQuantity = async () => {
        try {
            const total = await sumOrderItemQuantities(); // Soma todas as quantidades na tabela
            setTotalQuantity(total);
        } catch (error) {
            console.error("Erro ao buscar quantidade total:", error);
        }
    };

    useEffect(() => {
        fetchTotalQuantity();
        const unsubscribe = navigation.addListener("focus", fetchTotalQuantity); // Atualiza ao focar
        return unsubscribe;
    }, [navigation]);

    return (
        <TouchableOpacity
            style={styles.footerContainer}
            onPress={alert("Cupons")} // Navega para a tela de Finalizar Pedido
        >
            <View style={styles.iconContainer}>
                <Icon name="shopping-cart" size={24} color="#fff" />
                {totalQuantity > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{totalQuantity}</Text>
                    </View>
                )}
            </View>
            <Text style={styles.footerText}>Finalizar Pedido</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        position: "absolute",
        bottom: 60, // Espaço acima das tabs
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E90FF",
        padding: 15,
        zIndex: 10, // Garantir que fique acima das tabs
    },
    iconContainer: {
        marginRight: 10,
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
});  