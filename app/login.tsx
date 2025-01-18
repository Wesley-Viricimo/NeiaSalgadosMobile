import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Loading from "@/components/Loading";
import LoginService from "@/api/service/LoginService";
import LoginModel from "@/model/LoginModel";
import LoginResponse from "@/api/response/LoginResponse";
import UserStorageService from "@/service/UserStorageService";
import { useRouter } from "expo-router";
import PasswordInput from "@/components/PasswordInput";
import CustomInput from "@/components/CustomInput";
import * as Notifications from "expo-notifications"; // Importar expo-notifications
import Constants from "expo-constants";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userStorge = new UserStorageService();

  // Função para obter o token de push e enviar para a API
  const registerForPushNotificationsAsync = async () => {
      try {
          const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
          const token = (await Notifications.getExpoPushTokenAsync({
              projectId: projectId,
            }).then((res) => res.data));
            
          console.log("Expo Push Token:", token);

      } catch (error) {
          console.error("Erro ao obter o token de push:", error);
      }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      if (email && password) {
        const data = await LoginService.login(new LoginModel(email, password));

        if (data instanceof LoginResponse) {
          userStorge.saveUserData({
            id: data.id,
            name: data.name,
            role: data.role,
            token: data.token,
          });

          // Registra o token de push para o usuário logado
          await registerForPushNotificationsAsync();

          router.replace("/(tabs)");

        } else {
          Alert.alert("Erro", data);
        }
      } else {
        Alert.alert("Erro", `Email e senha devem ser fornecidos!`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        icon="person"
      />

      <PasswordInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
      />

      {/* Texto Esqueceu sua senha */}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.linkText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão de Login */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      {/* Texto para Cadastro */}
      <TouchableOpacity onPress={() => router.push("/userRegistration")}>
      {/* <TouchableOpacity onPress={() => Alert.alert("Cadastro")}> */}
        <Text style={styles.linkText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  linkText: {
    color: "#3498db",
    fontSize: 14,
    alignSelf: "center",
  },
  loginButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
