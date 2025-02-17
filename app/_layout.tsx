import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import * as Notifications from "expo-notifications";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NotificationProvider } from "@/context/NotificationContext";
import { initializeDatabase } from "@/database/database";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDatabase();
    };
    setupDatabase();

    const requestPermissionNotification = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Falha ao obter permissão para notificações!");
        }
      } catch (error) {
        console.error("Erro ao obter permissão para notificações:", error);
      }
    };

    requestPermissionNotification();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NotificationProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen
            name="productDetails"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="finishOrder" options={{ headerShown: false }} />
          <Stack.Screen
            name="addressRegistration"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="confirmationCode"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="userRegistration"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="productControl"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="productCreate" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </NotificationProvider>
  );
}
