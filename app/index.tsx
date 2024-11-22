import { Redirect } from 'expo-router';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import UserStorage from './storage/user.storage';

const userStorage = new UserStorage();

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await userStorage.getUserData(); 
        console.log('data', data);
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); 
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (userData) {
    return <Redirect href="/screen/HomeScreen" />;
  } else {
    return <Redirect href="/screen/LoginScreen" />;
  }
}