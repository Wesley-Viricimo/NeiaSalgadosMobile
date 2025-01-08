import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface OptionCardProps {
  iconName: string;
  title: string;
  onPress: () => void;
}

const OptionCard = ({ iconName, title, onPress }: OptionCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={32} color="#333" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    margin: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    elevation: 3,
    width: "40%", // Ocupa 40% da largura da tela
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },
});

export default OptionCard;