import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Alert, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OptionItem from "../../../components/optionItem/index";
import UserStorage from "../../../service/userStorage.service";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import TokenService from "../../../api/service/TokenService";

const Profile = () => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

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
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
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
      iconName: "local-offer",
      onPress: () => alert("Cupons"),
    },
    {
      id: "3",
      title: "Endereços",
      subtitle: "Endereços cadastrados",
      iconName: "location-on",
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
      iconName: "logout",
      onPress: handleLogout,
    },
  ];

  const renderItem = ({ item }) => (
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

export default Profile;