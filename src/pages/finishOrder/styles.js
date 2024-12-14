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
});