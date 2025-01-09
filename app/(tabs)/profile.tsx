import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Alert, Animated, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OptionItem from "../../components/OptionItem";
import UserStorage from "../../service/UserStorageService";
import { SafeAreaView } from "react-native-safe-area-context";
import TokenService from "../../service/TokenService";

interface Option {
    id: string;
    title: string;
    subtitle: string;
    iconName: string;
    onPress: () => void;
}

const Profile = () => {
  const [username, setUsername] = useState("");

  // Estados para animação
  const fadeAnim = useState(new Animated.Value(0))[0]; // Opacidade inicial (0)
  const slideAnim = useState(new Animated.Value(20))[0]; // Posição inicial (fora da tela)

  useEffect(() => {
    const fetchUserName = async () => {
      const userStorage = new UserStorage();
      const userData = await userStorage.getUserData();
      setUsername(userData.name || "Usuário");
    };
    fetchUserName();

    // Animação de fade e slide
    Animated.timing(fadeAnim, {
      toValue: 1, // Opacidade final
      duration: 400, // Duração em milissegundos
      useNativeDriver: true, // Usa aceleração de hardware
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0, // Deslocamento final
      duration: 400, // Duração em milissegundos
      useNativeDriver: true, // Usa aceleração de hardware
    }).start();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirmação de saída",
      "Você tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            const userStorage = new UserStorage();
            await userStorage.removeUserData();
            TokenService.clearToken();
            //VOLTAR PARA TELA DE LOGIN
          },
        },
      ],
      { cancelable: true }
    );
  };

  const initialOptions = [
    {
      id: "1",
      title: "Notificações",
      subtitle: "Minhas notificações",
      iconName: "notifications",
      onPress: () => alert("Notificações"),
    },
    {
      id: "2",
      title: "Cupons",
      subtitle: "Cupons de desconto",
      iconName: "pricetag",
      onPress: () => alert("Cupons"),
    },
    {
      id: "3",
      title: "Endereços",
      subtitle: "Endereços cadastrados",
      iconName: "location",
      onPress: () => alert("Endereços"),
    },
    {
      id: "4",
      title: "Informações da conta",
      subtitle: "Minhas informações de conta",
      iconName: "person",
      onPress: () => alert("Informações da conta"),
    },
  ];

  const footerOptions = [
    {
      id: "5",
      title: "Configurações",
      iconName: "settings",
      onPress: () => alert("Configurações"),
    },
    {
      id: "6",
      title: "Sair",
      iconName: "exit",
      onPress: handleLogout,
    },
  ];

  const renderItem = ({ item }: { item: Option }) => (
    <OptionItem
      title={item.title}
      subtitle={item.subtitle}
      iconName={item.iconName}
      onPress={item.onPress}
      showSubtitle={!!item.subtitle}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {username}</Text>
          <View style={styles.divider} />
        </View>
        <FlatList
          data={initialOptions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
        <View style={styles.footer}>
          {footerOptions.map((item) => (
            <OptionItem
              key={item.id}
              title={item.title}
              subtitle=""
              iconName={item.iconName}
              onPress={item.onPress}
              showSubtitle={false}
            />
          ))}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: "#fff",
    },
    greeting: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#333",
    },
    divider: {
      height: 1,
      backgroundColor: "#ddd",
      marginTop: 8,
    },
    listContent: {
      flexGrow: 1,
      paddingBottom: 60, // Adiciona espaço para o footer
    },
    footer: {
      bottom: -120, // Encostar na parte inferior
      flexDirection: "column",
      justifyContent: "flex-end",
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#ddd",
      paddingVertical: 16,
    },
  });

export default Profile;