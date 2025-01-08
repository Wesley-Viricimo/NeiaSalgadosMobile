import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyListMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    text: {
      fontSize: 16,
      color: "#888",
      fontStyle: "italic",
    },
  });