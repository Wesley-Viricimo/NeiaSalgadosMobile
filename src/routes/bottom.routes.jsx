import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import UserStorage from "../storage/user.storage";
import Home from "../pages/tabs/home";
import Orders from "../pages/tabs/orders";
import Profile from "../pages/tabs/profile";
import Admin from "../pages/tabs/admin";
import ProductDetails from "../pages/productDetails";
import ProductControl from "../pages/productControlScreens/productControl";
import ProductCreate from "../pages/productControlScreens/productCreate";
import TabFooter from "../components/tabFooter";
import { useNavigationState } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs({ userRole }) {
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
                tabBarActiveTintColor: "#1E90FF",
                tabBarInactiveTintColor: "#808080",
                tabBarIcon: ({ color, size, focused }) => {
                    const scaleAnim = new Animated.Value(focused ? 1.2 : 1);
                    const opacityAnim = new Animated.Value(focused ? 1 : 0.5);

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

    const state = useNavigationState((state) => state);
    const currentRoute = state?.routes[state?.index]?.name;

    const shouldShowFooter = ["Inicio", "Pedidos"].includes(currentRoute);

    if (userRole === null) return null;

    return (
        <View style={styles.container}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Tabs">
                    {() => (
                        <View style={styles.innerContainer}>
                            <Tabs userRole={userRole} />
                            <TabFooter />
                        </View>
                    )}
                </Stack.Screen>
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
                <Stack.Screen name="ProductControl" component={ProductControl} />
                <Stack.Screen name="ProductCreate" component={ProductCreate} />
            </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
    },
});