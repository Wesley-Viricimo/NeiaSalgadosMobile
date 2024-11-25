import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, FlatList } from "react-native";
import ProductCard from "../../components/ProductCard";
import LoadingIndicator from "../../components/LoadingIndicator";
import debounce from "../../utils/debounce";
import { fetchProducts } from "../../api/request/productApi";
import UserStorage from "../../storage/user.storage";

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const userStorage = new UserStorage();

  // Carrega produtos da API
  const loadProducts = async (searchText = "", pageNum = 1) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const userData = await userStorage.getUserData();
      const data = await fetchProducts(searchText, pageNum, userData.token);

      if (data.length > 0) {
        setProducts((prev) => (pageNum === 1 ? data : [...prev, ...data]));
        setHasMore(data.length === 10); // Verifica se há mais itens (tamanho do lote)
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce para busca otimizada
  const handleSearch = debounce((text) => {
    setSearch(text);
    setPage(1);
    setHasMore(true);
    loadProducts(text, 1); // Reinicia a busca com a página 1
  }, 500);

  // Carregamento inicial
  useEffect(() => {
    loadProducts();
  }, []);

  // Carrega mais produtos ao rolar a lista
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(search, nextPage);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar produtos..."
        onChangeText={handleSearch}
        value={search}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.idProduct.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReached={handleLoadMore} // Chamado ao alcançar o final da lista
        onEndReachedThreshold={0.1} // Percentual da altura da lista para acionar o carregamento
        ListFooterComponent={loading ? <LoadingIndicator /> : null} // Exibe indicador de carregamento no final
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
});
