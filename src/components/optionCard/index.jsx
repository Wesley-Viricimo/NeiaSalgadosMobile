import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./styles";

const OptionCard = ({ iconName, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icon name={iconName} size={32} color="#333" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionCard;