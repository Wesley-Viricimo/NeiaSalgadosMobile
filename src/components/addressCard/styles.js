import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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