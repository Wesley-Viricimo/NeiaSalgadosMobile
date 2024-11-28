import React from "react";
import { View, Text } from "react-native";
import OptionCard from "../../components/optionCard/index";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Admin = () => {
  const navigation = useNavigation();

  const handlePendingOrders = () => {
    console.log("Pedidos Pendentes");
  };

  const handleAllOrders = () => {
    console.log("Todos os Pedidos");
  };

  const handleProductControl = () => {
    navigation.navigate("ProductControl");
  };

  const handleUserControl = () => {
    console.log("Controle de Usuários");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Painel Administrativo</Text>
      <View style={styles.optionsContainer}>
        <OptionCard
          iconName="pending-actions"
          title="Pedidos Pendentes"
          onPress={handlePendingOrders}
        />
        <OptionCard
          iconName="list-alt"
          title="Todos os Pedidos"
          onPress={handleAllOrders}
        />
        <OptionCard
          iconName="inventory"
          title="Controle de Produtos"
          onPress={handleProductControl}
        />
        <OptionCard
          iconName="people"
          title="Controle de Usuários"
          onPress={handleUserControl}
        />
      </View>
    </SafeAreaView>
  );
};

export default Admin;