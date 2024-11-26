import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    margin: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    elevation: 3,
    width: "40%", // Ocupa 40% da largura da tela
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },
});