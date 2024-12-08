import React, { useState } from "react";
import { View, Text, Image, TextInput, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProductFooter from "../../components/productFooter/index";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const route = useRoute();
  const { product } = route.params;

  const [observation, setObservation] = useState("");

  const handleObservationChange = (text) => {
    if (text.length <= 140) {
      setObservation(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Imagem do Produto */}
        <Image source={{ uri: product.urlImage }} style={styles.image} />

        {/* Título do Produto */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Descrição do Produto */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Observações */}
        <View style={styles.observationContainer}>
          <View style={styles.label}>
            <View style={styles.iconBackground}>
              <Ionicons name="chatbubble" size={15} color="#fff" />
            </View>
            <Text style={styles.labelText}>Alguma observação?</Text>
            <Text style={styles.charCount}>{`${observation.length}/140`}</Text>
          </View>
          <TextInput
            style={styles.observationInput}
            multiline
            maxLength={140}
            placeholder="Ex: tirar cebola, maionese à parte etc."
            value={observation}
            onChangeText={handleObservationChange}
          />
        </View>
      </ScrollView>

      {/* Rodapé */}
      <ProductFooter
        price={product.price}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </SafeAreaView>
  );
}