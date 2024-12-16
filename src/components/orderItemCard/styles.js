import { StyleSheet } from "react-native";

export const orderItemCardStyles = StyleSheet.create({
  orderItemCard: {
    backgroundColor: "#f9f9f9", 
    padding: 15,
    marginBottom: 12,
    borderRadius: 12, 
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10, 
    shadowOffset: { width: 0, height: 5 },
    elevation: 4, 
  },
  orderItemDescription: {
    fontSize: 18, 
    fontWeight: "bold",
    color: "#2c3e50",  
    marginBottom: 6, 
  },
  orderItemDetails: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 3,
  },
  removeButton: {
    flexDirection: "row",  
    alignItems: "center", 
    marginTop: 20,
  },
  removeText: {
    fontSize: 14,
    color: "#e74c3c",
    textDecorationLine: "underline", 
    fontWeight: "bold", 
    marginLeft: 5, 
  },
 
});