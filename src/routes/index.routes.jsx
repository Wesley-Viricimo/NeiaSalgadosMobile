import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import BottomRoutes from './bottom.routes';
import UserStorage from '../storage/user.storage'; // Importando a classe UserStorage
import { ActivityIndicator, View, StyleSheet } from 'react-native'; // Indicador de carregamento

export default function Routes() {
  const Stack = createStackNavigator();
  const [initialRoute, setInitialRoute] = useState(null); // Para definir a rota inicial

  useEffect(() => {
    const checkAuthentication = async () => {
      const userStorage = new UserStorage();
      const userData = await userStorage.getUserData(); // Recupera os dados do usuário do AsyncStorage

      // Define a rota inicial com base nos dados de autenticação
      setInitialRoute(userData ? 'BottomRoutes' : 'Login');
    };

    checkAuthentication();
  }, []);

  // Exibe indicador de carregamento enquanto verifica autenticação
  if (!initialRoute) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#FFF',
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="BottomRoutes"
        component={BottomRoutes}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});