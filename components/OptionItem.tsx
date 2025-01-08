import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface OptionItemProps {
    title: string;
    subtitle: string;
    iconName: string; 
    onPress: () => void;
    showSubtitle?: boolean; 
}
  
const OptionItem = ({ title, subtitle, iconName, onPress, showSubtitle = true }: OptionItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={24} color="#333" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {showSubtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name={"chevron-right" as keyof typeof Ionicons.glyphMap} size={24} color="#ccc" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    iconContainer: {
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    subtitle: {
      fontSize: 14,
      color: "#666",
    },
  });

export default OptionItem;
