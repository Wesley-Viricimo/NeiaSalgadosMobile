import React from "react";
import { Text, StyleSheet, View } from "react-native";
import OptionCard from "@/components/OptionCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Admin() {
  const router = useRouter();
  
  const handlePendingOrders = () => {
    console.log("Pedidos Pendentes");
  };

  const handleAllOrders = () => {
    console.log("Todos os Pedidos");
  };

  const handleProductControl = () => {
    router.push("/productCreate");
  };

  const handleUserControl = () => {
    console.log("Controle de Usuários");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.greeting}>Painel Administrativo</Text>
      </View>

      <View style={[styles.optionsContainer]}>
        <OptionCard
          iconName="hourglass"
          title="Pedidos Pendentes"
          onPress={handlePendingOrders}
        />
        <OptionCard
          iconName="list"
          title="Todos os Pedidos"
          onPress={handleAllOrders}
        />
        <OptionCard
          iconName="cube"
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
}

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
