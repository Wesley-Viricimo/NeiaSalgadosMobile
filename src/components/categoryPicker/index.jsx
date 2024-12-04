import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, StyleSheet } from "react-native";

const CategoryPicker = ({ selectedCategory, onValueChange, categories }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.idCategory} label={category.description} value={category.idCategory} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  picker: {
    height: 55,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
  },
});

export default CategoryPicker;