// components/Footer/styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  footerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footerButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 8,
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});