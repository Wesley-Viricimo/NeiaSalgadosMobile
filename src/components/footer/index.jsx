import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Total: R$ 0,00</Text>
    <TouchableOpacity style={styles.footerButton}>
      <Text style={styles.footerButtonText}>Ver Carrinho</Text>
    </TouchableOpacity>
  </View>
);

export default Footer;