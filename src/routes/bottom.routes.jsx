import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/home';
import Orders from '../pages/orders';
import Profile from '../pages/profile';
import Admin from '../pages/admin/index';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Inicio"
                component={Home}
            />

            <Tab.Screen
                name="Pedidos"
                component={Orders}
            />

            <Tab.Screen
                name="Perfil"
                component={Profile}
            />

            <Tab.Screen
                name="Admin"
                component={Admin}
            />

        </Tab.Navigator>
    );
}