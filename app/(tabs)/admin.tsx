import React, { useEffect, useState } from "react";
import { Text, Animated, StyleSheet } from "react-native";
import OptionCard from "../../components/OptionCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Admin = () => {

  const [fadeAnim] = useState(new Animated.Value(0)); // Opacidade inicial
  const [slideAnim] = useState(new Animated.Value(50)); // Posição inicial (fora da tela)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Opacidade final
        duration: 400, // Duração em milissegundos
        useNativeDriver: true, // Usa aceleração de hardware
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Posição final
        duration: 400, // Duração em milissegundos
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePendingOrders = () => {
    console.log("Pedidos Pendentes");
  };

  const handleAllOrders = () => {
    console.log("Todos os Pedidos");
  };

  const handleProductControl = () => {
    // navigation.navigate("ProductControl");
  };

  const handleUserControl = () => {
    console.log("Controle de Usuários");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[ { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
        <Text style={styles.greeting}>Painel Administrativo</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.optionsContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
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
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fff",
    },
    greeting: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: "#333",
    },
    optionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around", // Organiza as opções com espaçamento uniforme
      marginTop: 16,
    },
  });

export default Admin;