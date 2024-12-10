import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Garante alinhamento vertical
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
    paddingLeft: 40,
    paddingRight: 40,
    padding: 12,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  trashIcon: {
    marginLeft: 16, // Espaço para separar do botão de adicionar
  },
});