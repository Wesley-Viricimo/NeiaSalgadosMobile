import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import OptionCard from "../../components/optionCard/index";
import UserStorage from "../../storage/user.storage";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

const Admin = () => {
  const userStorage = new UserStorage();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const userData = await userStorage.getUserData();
      setUserName(userData?.name || "Usuário");
    };

    fetchUserName();
  }, []);

  const handlePendingOrders = () => {
    console.log("Pedidos Pendentes");
  };

  const handleAllOrders = () => {
    console.log("Todos os Pedidos");
  };

  const handleProductControl = () => {
    console.log("Controle de Produtos");
  };

  const handleUserControl = () => {
    console.log("Controle de Usuários");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Olá, {userName}!</Text>
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