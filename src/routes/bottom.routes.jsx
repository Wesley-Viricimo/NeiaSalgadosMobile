import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import Orders from "../pages/orders";
import Profile from "../pages/profile";
import Admin from "../pages/admin/index";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importa a biblioteca de ícones

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
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
      <Tab.Screen
        name="Admin"
        component={Admin}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size || 24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}