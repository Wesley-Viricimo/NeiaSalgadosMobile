import React, { useState, useEffect } from "react";
import { FlatList, ToastAndroid, Animated, StyleSheet } from "react-native";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import EmptyListMessage from "@/components/EmptyListMessage";
import ProductService from "@/api/service/ProductService";
import { getOrderItemById } from "@/database/orderItemService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import TokenService from "@/service/TokenService";
import UserStorage from "@/service/UserStorageService";
import { Product } from "@/types/ProductTypes";
import { eventEmitter } from "@/utils/eventEmitter";

// Definindo tipos para os dados
interface SoldProducts {
  [key: number]: number;
}

export default function Home() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [soldProducts, setSoldProducts] = useState<SoldProducts>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true); // Estado para controle do carregamento inicial

  // Animação de opacidade e translação para os componentes da tela
  const [fadeAnim] = useState(new Animated.Value(0)); // Opacidade (de 0 a 1)
  const [translateAnim] = useState(new Animated.Value(30)); // Deslocamento para baixo (de 30 para 0)

  useEffect(() => {
    const listener = () => {
      loadProducts(debouncedInput, 1);
    };
    eventEmitter.on('productUpdated', listener);
    return () => {
      eventEmitter.off('productUpdated', listener); 
    };
  }, [debouncedInput]);

  const loadProducts = async (searchText: string = "", pageNum: number = 1) => {
    if (loading || (pageNum > 1 && !hasMore)) return;
    setLoading(true);
    try {
      const data: any = await ProductService.fetchProducts(searchText, pageNum);
  
      if (data?.message?.detail === 'Token inválido!') {
        const userStorage = new UserStorage();
        await userStorage.removeUserData();
        TokenService.clearToken();
        ToastAndroid.show("Token expirado, será rediracionado para tela de Login!", ToastAndroid.SHORT);
        router.replace("/login");
        return;
      }
  
      // Verifique se `data` é um array e se tem elementos
      if (Array.isArray(data) && data.length > 0) {
        const updatedSoldProducts = { ...soldProducts };
  
        // Atualizar quantidade de produtos vendidos
        await Promise.all(
          data.map(async (product: Product) => {
            const orderItem: any = await getOrderItemById(product.idProduct);
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
      setInitialLoad(false); // Após o carregamento inicial, altere para false
    }
  };  

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue !== debouncedInput) {
        setDebouncedInput(inputValue);
      }
    }, 150);
  
    return () => clearTimeout(handler);
  }, [inputValue, debouncedInput]);

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 600,
    useNativeDriver: true,
  }).start();

  Animated.timing(translateAnim, {
    toValue: 0,
    duration: 600,
    useNativeDriver: true,
  }).start();
  
  useEffect(() => {
    if (debouncedInput === inputValue) {
      setPage(1);
      setHasMore(true);
      loadProducts(debouncedInput, 1);
    }
  }, [debouncedInput]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(debouncedInput, nextPage);
    }
  };

  const handleCardPress = (product: Product) => {
    router.push({
      pathname: "/productDetails", // Caminho para a tela de detalhes
      params: { 
        idProduct: product.idProduct, 
        title: product.title, 
        description: product.description, 
        price: product.price, 
        urlImage: product.urlImage
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* O SearchBar deve ser visível sempre que o usuário estiver digitando */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateAnim }] }}>
        {/* O SearchBar aparece após o carregamento inicial e durante a digitação */}
        {!(loading && initialLoad) && <SearchBar value={inputValue} onChange={setInputValue} />}
      </Animated.View>

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
          ListFooterComponent={loading ? <LoadingAnimation /> : null}
          ListEmptyComponent={
            !loading && !initialLoad && products.length === 0 ? (
              <EmptyListMessage message="Nenhum produto encontrado!" />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#F3F4F6", // Fundo com tom claro
  },
});