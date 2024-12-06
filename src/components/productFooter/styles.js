import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 30,
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#28a745",
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});