import React, { useState, useEffect } from "react";
import { TextInput, FlatList } from "react-native";
import ProductCard from "../../components/ProductCard";
import LoadingIndicator from "../../components/loadingIndicator";
import Header from "../../components/header/index";
import Footer from "../../components/footer/index";
import FilterButton from "../../components/filterButton/index";
import HighlightCarousel from "../../components/highlightCarousel/index";
import ProductService from "../../api/service/ProductService";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightItems, setHighlightItems] = useState([]);

  useEffect(() => {
    ProductService.fetchHighlights().then(setHighlightItems);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <HighlightCarousel items={highlightItems} />
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar produtos..."
        onChangeText={setInputValue}
        value={inputValue}
      />
      <FilterButton onPress={() => console.log("Abrir filtro")} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.idProduct.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListFooterComponent={loading ? <LoadingIndicator /> : null}
      />
      <Footer />
    </SafeAreaView>
  );
}