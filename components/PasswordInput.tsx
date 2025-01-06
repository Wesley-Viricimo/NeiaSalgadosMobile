import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "@/global/styles";

interface PasswordInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput({
  label,
  value,
  onChangeText,
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.medium,
  },
  label: {
    fontSize: 16,
    color: colors.placeholder,
    marginBottom: 4,
    fontFamily: "Roboto-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.placeholder,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
  },
  icon: {
    marginRight: spacing.small,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontFamily: "Roboto-Regular",
  },
  eyeIcon: {
    padding: spacing.small,
  },
});