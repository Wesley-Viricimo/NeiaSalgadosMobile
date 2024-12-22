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
  listContent: {
    flexGrow: 1,
    paddingBottom: 60, // Adiciona espaço para o footer
  },
  footer: {
    bottom: -115, // Encostar na parte inferior
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 16,
  },
});