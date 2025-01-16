import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ícones do Expo
import { StyleSheet } from "react-native";

interface AdditionalOptionProps {
    title: string;
    price: number;
    checked: boolean;
    onPress: () => void;
}

export default function AdditionalOption({ title, price, checked, onPress }: AdditionalOptionProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>+ R$ {price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Ionicons
          name={checked ? "checkbox" : "checkbox-sharp"}
          size={30}
          color={checked ? "#FF4500" : "#aaa"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 14,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    price: {
      fontSize: 16,
      color: "#888",
    }
  });