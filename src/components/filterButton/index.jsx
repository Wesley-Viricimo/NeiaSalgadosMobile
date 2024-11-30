import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

const FilterButton = ({ onPress }) => (
  <TouchableOpacity style={styles.filterButton} onPress={onPress}>
    <Text style={styles.filterButtonText}>Filtrar</Text>
  </TouchableOpacity>
);

export default FilterButton;