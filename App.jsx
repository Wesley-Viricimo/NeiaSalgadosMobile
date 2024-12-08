import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Routes from "./src/routes/index.routes";
import { initializeDatabase } from "./src/database/database";

export default function App() {
  React.useEffect(() => {
    const setupDatabase = async () => {
      await initializeDatabase();
    };
    setupDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}