// components/CustomInput/index.js
import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export default function CustomInput({ icon, label, value, onChangeText, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <Ionicons name={icon} size={20} color="#888" style={styles.icon} />}
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