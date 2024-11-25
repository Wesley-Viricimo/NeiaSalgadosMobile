import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList } from "react-native";
import ProductCard from "../../components/ProductCard";
import LoadingIndicator from "../../components/LoadingIndicator";
import debounce from "../../utils/debounce";
import { fetchProducts } from "../../api/request/productApi";
import UserStorage from "../../storage/user.storage";
import { styles } from "./styles";

export default function Home() {
  const [search, setSearch] = useState(""); // Para controlar a pesquisa do usuário
  const [products, setProducts] = useState([]); // Inicializando como um array vazio
  const [loading, setLoading] = useState(false); // Para controlar o estado de carregamento
  const [page, setPage] = useState(1); // Para controlar a página de carregamento
  const [hasMore, setHasMore] = useState(true); // Para controlar se há mais produtos para carregar
  const userStorage = new UserStorage();

  // Função que carrega os produtos com base na pesquisa e na página
  const loadProducts = async (searchText = "", pageNum = 1) => {
    if (!hasMore) return; // Se não houver mais produtos para carregar, retorna
    setLoading(true);
    try {
      const userData = await userStorage.getUserData();
      const data = await fetchProducts(searchText, pageNum, userData.token); // Buscando os produtos

      // Se a resposta tiver produtos, atualiza o estado de products
      if (data.length > 0) {
        setProducts((prev) => (pageNum === 1 ? data : [...prev, ...data])); // Se for a primeira página, substitui os dados
      } else {
        setHasMore(false); // Se não houver mais produtos, não tenta mais buscar
      }
    } catch (error) {
      console.error(error); // Em caso de erro, loga o erro no console
    } finally {
      setLoading(false); // Fim do carregamento
    }
  };

  // Debounce para otimizar as buscas conforme o usuário digita
  const handleSearch = debounce((text) => {
    setSearch(text); // Atualiza o estado de busca
    setPage(1); // Reseta para a primeira página
    loadProducts(text, 1); // Recarrega os produtos
  }, 2000);

  // Carrega os produtos quando o componente é montado
  useEffect(() => {
    loadProducts();
  }, []);

  // Função chamada ao chegar ao final da lista para carregar mais produtos
  const handleLoadMore = () => {
    if (!loading) {
      setPage((prev) => prev + 1); // Incrementa a página
      loadProducts(search, page + 1); // Carrega os produtos da próxima página
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar produtos..."
        onChangeText={handleSearch} // Chama o debounce ao digitar
      />
      {loading && page === 1 ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={products} // Passa a lista de produtos para o FlatList
          keyExtractor={(item) => item.idProduct.toString()} // Usando idProduct como chave única
          renderItem={({ item }) => <ProductCard product={item} />} // Renderiza os produtos
          onEndReached={handleLoadMore} // Chama handleLoadMore quando chega ao final da lista
          onEndReachedThreshold={0.1} // Define o ponto de quando carregar mais produtos
          ListFooterComponent={loading ? <LoadingIndicator /> : null} // Exibe o indicador de carregamento no final
        />
      )}
    </View>
  );
}