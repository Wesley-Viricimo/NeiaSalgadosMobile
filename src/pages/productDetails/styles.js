import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginHorizontal: 16,
    marginBottom: 60,
  },
  observationContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  iconBackground: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: "#333", // Fundo escuro
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 8,
    flex: 1,
  },
  charCount: {
    fontSize: 14,
    color: "#999",
  },
  observationInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top", // Garante alinhamento no topo
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});