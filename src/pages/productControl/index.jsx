import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import OptionCard from "../../components/optionCard";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductControl = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Controle de Produtos</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <OptionCard
          iconName="edit"
          title="Alterar / Deletar Produtos"
          onPress={() => console.log("Alterar / Deletar Produtos")}
        />
        <OptionCard
          iconName="add-box"
          title="Cadastrar Novo Produto"
          onPress={() => navigation.navigate("ProductCreate")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductControl;