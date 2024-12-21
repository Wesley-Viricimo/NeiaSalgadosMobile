import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff", // Fundo branco limpo
    padding: 20,
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 22, // Título maior
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  addressCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f8f9fa", // Fundo leve
    borderRadius: 10, // Cantos arredondados
    borderWidth: 1,
    borderColor: "#e1e4e8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  noAddresses: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  addAddressButton: {
    marginTop: 20,
    backgroundColor: "#1e90ff", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#1e90ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addAddressButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#dcdcdc", // Cor neutra
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    textAlign: "center",
    color: "#2c3e50", // Texto escuro
    fontSize: 16,
    fontWeight: "500",
  },
});
