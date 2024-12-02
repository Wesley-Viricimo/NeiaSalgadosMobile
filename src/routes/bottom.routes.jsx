import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import UserStorage from "../storage/user.storage";
import Home from "../pages/tabs/home";
import Orders from "../pages/tabs/orders";
import Profile from "../pages/tabs/profile";
import Admin from "../pages/tabs/admin";

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  const [userRole, setUserRole] = useState(null);
  const userStorage = new UserStorage();

  useEffect(() => {
    const fetchUserRole = async () => {
      const userData = await userStorage.getUserData();
      setUserRole(userData?.role);
    };

    fetchUserRole();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarActiveTintColor: "#1E90FF", // Cor ativa
        tabBarInactiveTintColor: "#808080", // Cor inativa
        tabBarIcon: ({ color, size, focused }) => {
          const scaleAnim = new Animated.Value(focused ? 1.2 : 1); // Define a escala
          const opacityAnim = new Animated.Value(focused ? 1 : 0.5); // Define opacidade

          // Animações ao mudar o foco
          Animated.timing(scaleAnim, {
            toValue: focused ? 1.2 : 1,
            duration: 250,
            useNativeDriver: true,
          }).start();

          Animated.timing(opacityAnim, {
            toValue: focused ? 1 : 0.5,
            duration: 250,
            useNativeDriver: true,
          }).start();
          
          let iconName;
          if (route.name === "Inicio") iconName = "home";
          if (route.name === "Pedidos") iconName = "shopping-cart";
          if (route.name === "Perfil") iconName = "person";
          if (route.name === "Admin") iconName = "settings";

          return (
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              }}
            >
              <Icon name={iconName} color={color} size={size || 24} />
            </Animated.View>
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Pedidos" component={Orders} />
      <Tab.Screen name="Perfil" component={Profile} />
      {["ADMIN", "DEV"].includes(userRole) && (
        <Tab.Screen name="Admin" component={Admin} />
      )}
    </Tab.Navigator>
  );
}