import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import Orders from "../pages/orders";
import Profile from "../pages/profile";
import Admin from "../pages/admin/index";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importa a biblioteca de ícones
import UserStorage from "../storage/user.storage"; // Assumindo que você já possui um UserStorage configurado

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  const [userRole, setUserRole] = useState(null);
  const userStorage = new UserStorage();

  useEffect(() => {
    const fetchUserRole = async () => {
      const userData = await userStorage.getUserData();
      setUserRole(userData.role); // Supondo que o role é armazenado como "admin", "dev", etc.
    };

    fetchUserRole();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Remove o header no topo
        tabBarStyle: {
          backgroundColor: "#fff", // Define o estilo da barra inferior
          height: 50, // Ajusta a altura da barra
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size || 24} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color={color} size={size || 24} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size || 24} />
          ),
        }}
      />
      {["ADMIN", "DEV"].includes(userRole) && ( // Condicional para exibir apenas se for admin ou dev
        <Tab.Screen
          name="Admin"
          component={Admin}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings" color={color} size={size || 24} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}