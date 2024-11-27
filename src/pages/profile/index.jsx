import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import OptionItem from "../../components/optionItem/index";
import UserStorage from "../../storage/user.storage";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const userStorage = new UserStorage();
      const userData = await userStorage.getUserData();
      setUsername(userData.name || "Usuário");
    };
    fetchUserName();
  }, []);

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
      onPress: () => alert("Sair"),
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
    </SafeAreaView>
  );
};

export default Profile;