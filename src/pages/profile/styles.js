import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 25,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginTop: 8,
  },
  footer: {
    position: "absolute", // Fixar no final da tela
    bottom: -18, // Encostar na parte inferior
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderTopColor: "#ddd",
  },
});