import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    fontSize: 20, // Tamanho dos pontinhos
    color: "#1E90FF", // Cor dos pontinhos
    marginHorizontal: 4, // Espaçamento entre os pontinhos
  },
});
