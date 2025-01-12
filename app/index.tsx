import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import UserStorage from "@/service/UserStorageService";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importando o hook de navegação
import LoadingAnimation from "@/components/LoadingAnimation";

export default function Index() {
  const router = useRouter();
  const navigation = useNavigation(); // Hook para acessar o objeto de navegação
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Remover o header enquanto estamos verificando o usuário
    navigation.setOptions({
      headerShown: false,
    });

    const checkUserData = async () => {
      const userStorage = new UserStorage();
      const userData = await userStorage.getUserData();

      // Se existir dados do usuário, redireciona para as tabs, caso contrário, para o login
      if (userData) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
      setLoading(false); // Termina o carregamento
    };

    if (isMounted) {
      checkUserData();
    }
  }, [isMounted, router, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingAnimation />
      </View>
    ); // Exibe um carregamento enquanto verifica os dados do usuário
  }

  return null; // Já redirecionado
}