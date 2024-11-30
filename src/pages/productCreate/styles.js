import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
    color: "#007BFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  filePreview: {
    marginVertical: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
  },
  fileName: {
    fontSize: 16,
    color: "#333",
  },
  filePlaceholder: {
    fontSize: 14,
    color: "#AAA",
  },
});