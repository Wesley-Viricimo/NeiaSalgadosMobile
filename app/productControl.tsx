import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import OptionCard from "@/components/OptionCard";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductControl() {
  const router = useRouter();

  // Estados para animação
  const fadeAnim = useState(new Animated.Value(0))[0]; // Opacidade inicial (0)
  const slideAnim = useState(new Animated.Value(30))[0]; // Posição inicial (fora da tela)

  useEffect(() => {
    // Inicia as animações ao carregar a tela
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Opacidade final
        duration: 500, // Duração em milissegundos
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Posição final
        duration: 500, // Duração em milissegundos
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com animação */}
      <Animated.View
        style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <TouchableOpacity onPress={() => router.back() } style={styles.backButton}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Controle de Produtos</Text>
      </Animated.View>

      {/* Options com animação */}
      <Animated.View
        style={[
          styles.optionsContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
        
      >
        <OptionCard
          iconName="add-circle"
          title="Cadastrar Novo Produto"
          onPress={() => router.push("/productCreate")}
        />
        <OptionCard
          iconName="create"
          title="Alterar / Deletar Produtos"
          onPress={() => console.log("Alterar / Deletar Produtos")}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      position: "relative",
    },
    backButton: {
      position: "absolute",
      left: 16,
    },
    backArrow: {
      fontSize: 40,
      color: "#333",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    optionsContainer: {
      flexDirection: "row", // Alinha os cartões lado a lado
      justifyContent: "space-around",
      alignItems: "center",
      padding: 16,
    },
  });