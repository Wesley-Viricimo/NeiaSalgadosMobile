import { Text, SafeAreaView } from "react-native";
import React from "react";

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Orders</Text>
    </SafeAreaView>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import { FlatList, ToastAndroid, Animated, StyleSheet } from "react-native";
// import SearchBar from "../../components/SearchBar";
// import ProductCard from "../../components/ProductCard";
// import LoadingAnimation from "../../components/LoadingAnimation";
// import EmptyListMessage from "../../components/EmptyListMessage";
// import ProductService from "../../api/service/ProductService";
// import { getOrderItemById } from "../../../database/orderItemService";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import TokenService from "../../service/TokenService";
// import UserStorage from "../../service/UserStorageService";

// export default function Home() {
//   const navigation = useNavigation();

//   const [inputValue, setInputValue] = useState("");
//   const [debouncedInput, setDebouncedInput] = useState("");
//   const [products, setProducts] = useState([]);
//   const [soldProducts, setSoldProducts] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [initialLoad, setInitialLoad] = useState(true); // Estado para controle do carregamento inicial

//   // Animação de opacidade e translação para os componentes da tela
//   const [fadeAnim] = useState(new Animated.Value(0)); // Opacidade (de 0 a 1)
//   const [translateAnim] = useState(new Animated.Value(30)); // Deslocamento para baixo (de 30 para 0)

//   const loadProducts = async (searchText = "", pageNum = 1) => {
//     if (loading || (pageNum > 1 && !hasMore)) return;
//     setLoading(true);
//     try {
//       const data = await ProductService.fetchProducts(searchText, pageNum);

//       if (data.message?.detail === 'Token inválido!') {
//         const userStorage = new UserStorage();
//         await userStorage.removeUserData();
//         TokenService.clearToken();
//         ToastAndroid.show("Token expirado, será rediracionado para tela de Login!", ToastAndroid.SHORT);
//         navigation.reset({
//           index: 0,
//           routes: [{ name: "Login" }]
//         });
//         return;
//       }

//       if (data.length > 0) {
//         const updatedSoldProducts = { ...soldProducts };

//         // Atualizar quantidade de produtos vendidos
//         await Promise.all(
//           data.map(async (product) => {
//             const orderItem = await getOrderItemById(product.idProduct);
//             updatedSoldProducts[product.idProduct] = orderItem?.quantity || 0;
//           })
//         );

//         setSoldProducts(updatedSoldProducts);
//         setProducts((prev) =>
//           pageNum === 1 ? data : [...prev, ...data]
//         );
//         setHasMore(data.length === 10);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//       setInitialLoad(false); // Após o carregamento inicial, altere para false
//     }
//   };

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedInput(inputValue);
//     }, 300);
//     return () => clearTimeout(handler);
//   }, [inputValue]);

//   useEffect(() => {
//     setPage(1);
//     setHasMore(true);
//     setProducts([]); // Limpar a lista de produtos quando o input for alterado

//     // Inicia a animação de fade e deslizamento para os componentes
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 600,
//       useNativeDriver: true,
//     }).start();

//     Animated.timing(translateAnim, {
//       toValue: 0,
//       duration: 600,
//       useNativeDriver: true,
//     }).start();

//     loadProducts(debouncedInput, 1); // Carregar produtos com o valor de busca
//   }, [debouncedInput]);

//   const handleLoadMore = () => {
//     if (!loading && hasMore) {
//       const nextPage = page + 1;
//       setPage(nextPage);
//       loadProducts(debouncedInput, nextPage);
//     }
//   };

//   const handleCardPress = (product) => {
//     navigation.navigate("ProductDetails", {
//       product,
//       soldQuantity: soldProducts[product.idProduct] || 0,
//       onAddToCart: (id, quantity) => {
//         if (quantity > 0) {
//           setSoldProducts((prev) => ({ ...prev, [id]: quantity }));
//         } else {
//           setSoldProducts((prev) => {
//             const updated = { ...prev };
//             delete updated[id];
//             return updated;
//           });
//         }
//       },
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* O SearchBar deve ser visível sempre que o usuário estiver digitando */}
//       <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateAnim }] }}>
//         {/* O SearchBar aparece após o carregamento inicial e durante a digitação */}
//         {!(loading && initialLoad) && <SearchBar value={inputValue} onChange={setInputValue} />}
//       </Animated.View>

//       {loading && page === 1 ? (
//         <LoadingAnimation />
//       ) : (
//         <FlatList
//           data={products}
//           keyExtractor={(item) => item.idProduct.toString()}
//           renderItem={({ item }) => (
//             <ProductCard
//               product={item}
//               onPress={handleCardPress}
//               soldQuantity={soldProducts[item.idProduct] || 0}
//             />
//           )}
//           onEndReached={handleLoadMore}
//           onEndReachedThreshold={0.1}
//           ListFooterComponent={loading ? <LoadingAnimation /> : null}
//           ListEmptyComponent={
//             !loading && !initialLoad && products.length === 0 && (
//               <EmptyListMessage message="Nenhum produto encontrado!" />
//             )
//           }
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingLeft: 8,
//     paddingRight: 8,
//     backgroundColor: "#F3F4F6", // Fundo com tom claro
//   },
// });
