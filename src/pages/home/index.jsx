import React, { useState, useEffect } from "react";
import { TextInput, FlatList } from "react-native";
import ProductCard from "../../components/ProductCard";
import LoadingIndicator from "../../components/LoadingIndicator";
import ProductService from "../../api/service/ProductService";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [inputValue, setInputValue] = useState(""); // Valor digitado pelo usuário
  const [debouncedInput, setDebouncedInput] = useState(""); // Valor com debounce
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Função para carregar produtos da API
  const loadProducts = async (searchText = "", pageNum = 1) => {
    if (loading || (pageNum > 1 && !hasMore)) return;

    setLoading(true);
    try {
      const data = await ProductService.fetchProducts(searchText, pageNum);

      if (data.length > 0) {
        setProducts((prev) => (pageNum === 1 ? data : [...prev, ...data]));
        setHasMore(data.length === 10); // Verifica se há mais itens no lote
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza o estado com debounce ao alterar `inputValue`
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(inputValue);
    }, 300);

    return () => clearTimeout(handler); // Limpa o timeout anterior
  }, [inputValue]);

  // Dispara a busca ao alterar `debouncedInput`
  useEffect(() => {
    setPage(1); // Reinicia para a página inicial
    setHasMore(true);
    loadProducts(debouncedInput, 1);
  }, [debouncedInput]);

  // Carrega mais produtos ao rolar a lista
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(debouncedInput, nextPage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar produtos..."
        onChangeText={setInputValue} // Atualiza o valor digitado
        value={inputValue}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.idProduct.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReached={handleLoadMore} // Chamado ao alcançar o final da lista
        onEndReachedThreshold={0.1} // Percentual da altura da lista para acionar o carregamento
        ListFooterComponent={loading ? <LoadingIndicator /> : null} // Exibe indicador de carregamento no final
      />
    </SafeAreaView>
  );
}