import React, { useState, useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from '../pages/login';
import BottomRoutes from './bottom.routes';
import UserStorage from '../storage/user.storage';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Importa a biblioteca de animações
import ProductControl from '../pages/productControlScreens/productControl';
import ProductCreate from '../pages/productControlScreens/productCreate';
import UserRegistration from '../pages/registrationScreens/userRegistration';
import ConfirmationCode from '../pages/registrationScreens/confirmationCode';
import ProductDetails from '../pages/productDetails';

export default function Routes() {
  const Stack = createStackNavigator();
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userStorage = new UserStorage();
      const userData = await userStorage.getUserData();
      setInitialRoute(userData ? 'BottomRoutes' : 'Login');
    };

    checkAuthentication();
  }, []);

  if (!initialRoute) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.dotsContainer}>
          {/* Pontinho 1 */}
          <Animatable.Text
            style={styles.dot}
            animation="bounce"
            iterationCount="infinite"
            delay={0}
          >
            ●
          </Animatable.Text>
          {/* Pontinho 2 */}
          <Animatable.Text
            style={styles.dot}
            animation="bounce"
            iterationCount="infinite"
            delay={200} // Atraso para o efeito ser escalonado
          >
            ●
          </Animatable.Text>
          {/* Pontinho 3 */}
          <Animatable.Text
            style={styles.dot}
            animation="bounce"
            iterationCount="infinite"
            delay={400}
          >
            ●
          </Animatable.Text>
        </View>
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFF' },
        gestureEnabled: true,
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
      <Stack.Screen name="ProductControl" component={ProductControl} />
      <Stack.Screen name="ProductCreate" component={ProductCreate} />
      <Stack.Screen name="UserRegistration" component={UserRegistration} />
      <Stack.Screen name="ConfirmationCode" component={ConfirmationCode} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    fontSize: 30, // Tamanho dos pontinhos
    color: '#1E90FF',
    marginHorizontal: 5, // Espaçamento entre os pontinhos
  },
});