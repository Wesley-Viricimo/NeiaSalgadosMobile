import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "space-between",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    addressCard: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    noAddresses: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    addAddressButton: {
        marginTop: 10,
        backgroundColor: "#FF4500",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addAddressButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#ccc",
        paddingVertical: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        textAlign: "center",
        color: "#000",
        fontSize: 16,
    },
});