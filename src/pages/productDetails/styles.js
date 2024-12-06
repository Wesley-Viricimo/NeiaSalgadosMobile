import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
  },
  description: {
    padding: 16,
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  additionalTitle: {
    padding: 16,
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
