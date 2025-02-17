import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Alert, StyleSheet } from "react-native";
import OptionItem from "@/components/OptionItem";
import UserStorage from "@/service/UserStorageService";
import { SafeAreaView } from "react-native-safe-area-context";
import TokenService from "@/service/TokenService";
import { useRouter } from "expo-router";

interface Option {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  onPress: () => void;
  disabled?: boolean; // Novo campo para desabilitar a opção
}

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("Usuário");
  const [isAdminOrDev, setIsAdminOrDev] = useState(false);
  const userStorage = new UserStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userStorage.getUserData();
      setUsername(userData.name || "Usuário");

      // Verifica se a role do usuário é admin ou dev
      if (userData.role === "ADMIN" || userData.role === "DEV") {
        setIsAdminOrDev(true);
      }
    };

    fetchUserData();
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
            await userStorage.removeUserData();
            TokenService.clearToken();
            router.replace("/login");
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

  if (isAdminOrDev) {
    initialOptions.push({
      id: "5",
      title: "Administrativo",
      subtitle: "Painel Administrativo",
      iconName: "settings",
      onPress: () => router.push("/admin")
    });
  }

  const footerOptions = [
    {
      id: "6",
      title: "Configurações",
      iconName: "settings",
      onPress: () => alert("Configurações"),
    },
    {
      id: "7",
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
      onPress={
        item.disabled
          ? () =>
              Alert.alert(
                "Acesso Negado",
                "Você não tem permissão para acessar esta área."
              )
          : item.onPress
      }
      showSubtitle={!!item.subtitle}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

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
    bottom: -15, // Encostar na parte inferior
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 16,
  },
});
