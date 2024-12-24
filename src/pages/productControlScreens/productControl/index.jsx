import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Animated } from "react-native";
import { styles } from "./styles";
import OptionCard from "../../../components/optionCard";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductControl = () => {
  const navigation = useNavigation();

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
          iconName="edit"
          title="Alterar / Deletar Produtos"
          onPress={() => console.log("Alterar / Deletar Produtos")}
        />
        <OptionCard
          iconName="add-box"
          title="Cadastrar Novo Produto"
          onPress={() => navigation.navigate("ProductCreate")}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProductControl;