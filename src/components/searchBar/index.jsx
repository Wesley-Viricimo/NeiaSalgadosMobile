import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" />
      <TextInput
        style={styles.input}
        placeholder="Pesquisar produtos..."
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}