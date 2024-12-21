import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: "#ffffff", // Fundo branco para destacar o card
    borderRadius: 10, // Cantos mais arredondados
    shadowColor: "#000", // Sombra suave para destaque
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Para sombra no Android
    padding: 20, // Maior espaço interno
    marginHorizontal: 15, // Espaçamento lateral
    minHeight: 140, // Altura mínima ajustada
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 20, // Maior espaço entre o ícone e os detalhes
    justifyContent: "center",
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontWeight: "bold",
    fontSize: 20, // Fonte maior para o tipo do endereço
    color: "#2c3e50", // Cor mais moderna
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: "#7f8c8d", // Cor mais suave para o texto
    marginBottom: 6,
  },
});