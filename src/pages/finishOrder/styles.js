import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E90FF",
        padding: 15,
    },
    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        borderBottomWidth: 2,
        borderColor: "#ccc",
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    selectedTab: {
        borderBottomWidth: 3,
        borderColor: "#FF4500",
    },
    tabText: {
        fontSize: 16,
        color: "#000",
    },
    selectedTabText: {
        color: "#FF4500",
    },
    selectAddressButton: {
        marginTop: 20,
        backgroundColor: "#FF4500",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 30,
    },
    selectAddressButtonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    scrollContent: {
        padding: 20,
    },

    // Estilos para o endereço de retirada
    pickupAddressContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 15,
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    iconContainer: {
        marginRight: 15,
    },
    addressTextContainer: {
        flex: 1,
    },
    pickupTextBold: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    pickupText: {
        fontSize: 14,
        color: "#555",
    },

    // Estilos para tempo estimado
    timeContainer: {
        marginTop: 20,
        marginHorizontal: 15,
    },
    timeText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    timeValue: {
        fontSize: 18,
        color: "#555",
    },

    // Linha de separação
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginVertical: 20,
        marginHorizontal: 15,
    },

    // Estilos para pagamento
    paymentSection: {
        marginHorizontal: 15,
    },
    paymentText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },

    paymentOptionText: {
        fontSize: 18,
        color: "#FF4500",
        paddingLeft: 10,
    },

    // Estilo para o sublinhado
    selectedPaymentOption: {
        height: 2,  // Altura do sublinhado
        backgroundColor: "#FF4500",  // Cor do sublinhado
        marginTop: 5,  // Espaçamento entre o texto e a linha
        width: "45%",  // Largura do sublinhado, ajustada ao texto
        alignSelf: "flex-start",  // Alinha o sublinhado com o texto
    },
});