import React from "react";
import { StyleSheet } from "react-native";
import { View, ActivityIndicator, Text } from "react-native";

export default function LoadingAnimation() {
  return (
    <View style={[styles.loadingContainer]}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Carregando informações...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });