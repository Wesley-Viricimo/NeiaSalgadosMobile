import React from "react";
import { View, ActivityIndicator } from "react-native";
import { styles } from "./styles";

export default function LoadingAnimation({ small }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={small ? "small" : "large"} color="#1E90FF" />
    </View>
  );
}