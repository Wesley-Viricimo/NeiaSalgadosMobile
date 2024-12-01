import React from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';

const InputField = ({ index, value, onChange, onFocus }) => {
  return (
    <View style={styles.inputFieldContainer}>
      <TextInput
        style={styles.inputField}
        value={value}
        maxLength={1}
        keyboardType="text"
        onChangeText={onChange}
        onFocus={onFocus}
      />
    </View>
  );
};

export default InputField;