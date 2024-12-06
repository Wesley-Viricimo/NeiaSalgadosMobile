import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import SearchBar from "../../../components/searchBar/index";
import ProductCard from "../../../components/productCard/index";
import LoadingAnimation from "../../../components/loadingAnimation/index";
import EmptyListMessage from "../../../components/emptyListMessage/index";
import ProductService from "../../../api/service/ProductService";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = async (searchText = "", pageNum = 1) => {
    if (loading || (pageNum > 1 && !hasMore)) return;
    setLoading(true);
    try {
      const data = await ProductService.fetchProducts(searchText, pageNum);
      if (data.length > 0) {
        setProducts((prev) => (pageNum === 1 ? data : [...prev, ...data]));
        setHasMore(data.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Gerencia a pesquisa com debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      loadProducts(debouncedInput, 1);
    }, 300);
    return () => clearTimeout(handler);
  }, [debouncedInput]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(debouncedInput, nextPage);
    }
  };

  const handleCardPress = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar value={inputValue} onChange={setInputValue} />
      {loading && page === 1 ? (
        <LoadingAnimation />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.idProduct.toString()}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={handleCardPress} />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading ? <LoadingAnimation small /> : null}
          ListEmptyComponent={
            !loading && <EmptyListMessage message="Nenhum produto encontrado!" />
          }
        />
      )}
    </SafeAreaView>
  );
}