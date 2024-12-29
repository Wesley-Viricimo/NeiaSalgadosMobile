import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { initializeDatabase } from "./src/database/database";
import Routes from "./src/routes/index.routes";
import * as Notifications from "expo-notifications";

// Função para lidar com notificações recebidas
const handleNotification = (notification) => {
  console.log("Notificação recebida:", notification);
  // Aqui você pode personalizar o comportamento ao receber notificações
};

export default function App() {
  useEffect(() => {
    // Configura o banco de dados
    const setupDatabase = async () => {
      await initializeDatabase();
    };
    setupDatabase();

    // Registra os listeners para notificações
    const notificationListener = Notifications.addNotificationReceivedListener(handleNotification);
    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Resposta da notificação:", response);
    });

    // Cleanup listeners ao desmontar o componente
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}