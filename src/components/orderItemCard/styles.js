import { StyleSheet } from "react-native";

export const orderItemCardStyles = StyleSheet.create({
  orderItemCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  orderItemDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderItemDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});