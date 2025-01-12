import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import InputConfirmationCode from "@/components/InputConfirmationCode";
import ResendCodeButton from "@/components/ResendCodeButton";
import UserService from "@/api/service/UserService";
import VerifyCodeModel from "@/model/VerifyCodeModel";
import { useRouter } from 'expo-router'; // Alteração: useRouter em vez de useSearchParams
import { RouteProp, useRoute } from "@react-navigation/native";

type RootStackParamList = {
    ConfirmationCode: { email: string };
  };

type ConfirmationCodeProps = RouteProp<RootStackParamList, "ConfirmationCode">;

export default function ConfirmationCode() {
  const route = useRoute<ConfirmationCodeProps>();
  const router = useRouter();
  const { email } = route.params;

  const [code, setCode] = useState(Array(5).fill("")); // Array para armazenar os dígitos do código
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]); // Referências para os campos de entrada

  const handleCodeSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await UserService.verifyCode(
        new VerifyCodeModel(email, code.join(""))
      );
      if (response.status === 200) {
        Alert.alert("Sucesso", response.message);
        router.replace("/login");
      } else {
        Alert.alert("Erro", response.message);
        setCode(Array(5).fill("")); // Limpa os campos
        inputRefs.current[0]?.focus(); // Volta para o primeiro campo
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao verificar o código!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitChange = (digit: string, index: number) => {
    const newCode = [...code];
    newCode[index] = digit.toUpperCase();
    setCode(newCode);

    // Move para o próximo campo automaticamente
    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Um código de confirmação foi enviado para o email {email}, insira o
        código nos campos abaixo para ativar a conta.
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <InputConfirmationCode
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)} // Atribui referência ao campo
            value={digit}
            onChange={(text) => handleDigitChange(text, index)}
            onKeyPress={(key) => handleKeyPress(key, index)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleCodeSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#0000ff" />
        ) : (
          <Text style={styles.buttonText}>Confirmar</Text>
        )}
      </TouchableOpacity>
      <ResendCodeButton email={email} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    marginHorizontal: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "80%",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  resendButton: {
    marginTop: 10,
    width: "80%",
  },
  resendText: {
    color: "#007BFF",
    textAlign: "center",
    fontSize: 16,
  },
});