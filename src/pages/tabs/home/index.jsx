import React, { useState, useEffect } from "react";
import { FlatList, ToastAndroid } from "react-native";
import SearchBar from "../../../components/searchBar/index";
import ProductCard from "../../../components/productCard/index";
import LoadingAnimation from "../../../components/loadingAnimation/index";
import EmptyListMessage from "../../../components/emptyListMessage/index";
import ProductService from "../../../api/service/ProductService";
import { getOrderItemById } from "../../../database/orderItemService";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import TokenService from "../../../api/service/TokenService";

export default function Home() {
  const navigation = useNavigation();

  const [inputValue, setInputValue] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [products, setProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadProducts = async (searchText = "", pageNum = 1) => {
    if (loading || (pageNum > 1 && !hasMore)) return;
    setLoading(true);
    try {
      const data = await ProductService.fetchProducts(searchText, pageNum);
      
      if(data.message?.detail === 'Token inválido!') {
        TokenService.clearToken();
        ToastAndroid.show("Token expirado, será rediracionado para tela de Login!", ToastAndroid.SHORT);
        navigation.reset({ // Redefine a pilha para que a tela de login seja a única acessível
          index: 0,
          routes: [{ name: "Login" }]
        });
        return;
      }

      if (data.length > 0) {
        const updatedSoldProducts = { ...soldProducts };

        // Atualizar quantidade de produtos vendidos
        await Promise.all(
          data.map(async (product) => {
            const orderItem = await getOrderItemById(product.idProduct);
            updatedSoldProducts[product.idProduct] = orderItem?.quantity || 0;
          })
        );

        setSoldProducts(updatedSoldProducts);
        setProducts((prev) =>
          pageNum === 1 ? data : [...prev, ...data]
        );
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(inputValue);
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadProducts(debouncedInput, 1);
  }, [debouncedInput]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(debouncedInput, nextPage);
    }
  };

  const handleCardPress = (product) => {
    navigation.navigate("ProductDetails", {
      product,
      soldQuantity: soldProducts[product.idProduct] || 0,
      onAddToCart: (id, quantity) => {
        if (quantity > 0) {
          setSoldProducts((prev) => ({ ...prev, [id]: quantity })); // Adiciona/Atualiza o produto vendido
        } else {
          setSoldProducts((prev) => {
            const updated = { ...prev };
            delete updated[id]; // Remove o produto vendido
            return updated;
          });
        }
      },
    });
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
            <ProductCard
              product={item}
              onPress={handleCardPress}
              soldQuantity={soldProducts[item.idProduct] || 0}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? <LoadingAnimation small /> : null
          }
          ListEmptyComponent={
            !loading && <EmptyListMessage message="Nenhum produto encontrado!" />
          }
        />
      )}
    </SafeAreaView>
  );
}