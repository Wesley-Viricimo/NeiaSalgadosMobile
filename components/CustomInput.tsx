// components/CustomInput/index.js
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/global/styles';

interface CustomInputProps {
    icon: string;
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    [key: string]: any;
}

export default function CustomInput({ icon, label, value, onChangeText, ...props }: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color="#888" style={styles.icon} />}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          {...props}
        />
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
      fontFamily: 'Roboto-Regular',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.placeholder,
      paddingHorizontal: spacing.small,
      paddingVertical: 16,
    },
    icon: {
      marginRight: spacing.small,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
      fontFamily: 'Roboto-Regular',
    },
  });