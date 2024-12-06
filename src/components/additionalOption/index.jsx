import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Ícones do Expo
import { styles } from "./styles";

export default function AdditionalOption({ title, price, checked, onPress }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>+ R$ {price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name={checked ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={checked ? "#4caf50" : "#aaa"}
        />
      </TouchableOpacity>
    </View>
  );
}