import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { styles } from "./styles";

export default function LoadingAnimation() {
  return (
    <View style={[styles.container, styles.loadingContainer]}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Carregando informações...</Text>
    </View>
  );
}