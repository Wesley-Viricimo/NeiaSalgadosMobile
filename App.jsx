import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

