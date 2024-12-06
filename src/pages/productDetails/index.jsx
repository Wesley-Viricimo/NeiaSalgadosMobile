import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AdditionalOption from "../../components/additionalOption/index";
import ProductFooter from "../../components/productFooter/index";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const [selectedAdditions, setSelectedAdditions] = useState({});
  const [quantity, setQuantity] = useState(1);

  const toggleAddition = (name) => {
    setSelectedAdditions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.backIcon} onPress={() => navigation.goBack()}>
          {"<"}
        </Text>
        <Text style={styles.title}>{product.title}</Text>
      </View>

      {/* Corpo da Tela */}
      <ScrollView>
        <Image source={{ uri: product.urlImage }} style={styles.image} />
        <Text style={styles.description}>{product.description}</Text>

        {/* Adicionais */}
        <Text style={styles.additionalTitle}>Adicionais</Text>
        <AdditionalOption
          title="Maionese extra"
          price={10}
          checked={!!selectedAdditions["Maionese extra"]}
          onPress={() => toggleAddition("Maionese extra")}
        />
        <AdditionalOption
          title="Catchup extra"
          price={10}
          checked={!!selectedAdditions["Catchup extra"]}
          onPress={() => toggleAddition("Catchup extra")}
        />
        <AdditionalOption
          title="Catupiry extra"
          price={10}
          checked={!!selectedAdditions["Catupiry extra"]}
          onPress={() => toggleAddition("Catupiry extra")}
        />
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