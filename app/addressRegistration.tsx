import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import CustomInput from '@/components/CustomInput';
import LoadingButton from '@/components/LoadingButton';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddressService } from '@/api/service/AddressService';
import { colors, spacing } from '@/global/styles';

export default function AddressRegistration() {
   const router = useRouter();
  // Estados para os campos do endereço
  const [cep, setCep] = useState<string>('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState<string>('');
  const [complement, setComplement] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);  // Estado para controlar se está fazendo a requisição do CEP

  // Função para buscar dados do endereço usando o CEP
  const fetchAddressData = async (cep: string) => {
    setIsFetching(true);
    try {
      const response = await AddressService.fetchAddressByCep(cep);
      if (response.status === 200) {
        setState(response.data.state);
        setCity(response.data.city);
        setDistrict(response.data.district);
        setStreet(response.data.road);
      } else {
        Alert.alert('Erro', 'CEP não encontrado!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar endereço. Tente novamente.');
    } finally {
      setIsFetching(false); // Desativa o carregamento
    }
  };

  // Função para lidar com a alteração do CEP
  const handleCepChange = (cep: string) => {
    setCep(cep);

    if (cep.length === 8) {  // Quando o CEP atingir 8 caracteres, faz a requisição
      fetchAddressData(cep);
    }
  };

  // Função de registro de endereço
  const handleRegister = async () => {
    if (!cep || !state || !city || !district || !street || !number) {
      return Alert.alert('Erro', 'Os campos obrigatórios devem ser preenchidos!');
    }

    setIsLoading(true);
    try {
      const response = await AddressService.createAddress({ cep, state, city, district, road: street, number, complement });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');
        router.back();
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar endereço. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro inesperado ao cadastrar endereço.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Animação de fade e slide */}
        <View>
          <Text style={styles.header}>Cadastro de Endereço</Text>

          <View style={styles.rowContainer}>
            <View style={styles.halfWidthInputContainerCep}>
              <Text style={styles.label}>CEP</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={cep}
                  onChangeText={handleCepChange}
                  maxLength={8}
                  keyboardType="numeric"
                  editable={!isFetching} // Desabilita a digitação enquanto o CEP está sendo buscado
                />
              </View>
            </View>

            <View style={styles.narrowInputContainerState}>
              <Text style={styles.label}>Estado</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input]}  // Adicionando estilo de campo inativo
                  value={state}
                  onChangeText={setState}
                  editable={false} // Campos desabilitados para digitação
                />
              </View>
            </View>
          </View>

          <CustomInput label="Cidade" value={city} onChangeText={setCity} editable={false} />
          <CustomInput label="Bairro" value={district} onChangeText={setDistrict} editable={false} />
          <CustomInput label="Rua" value={street} onChangeText={setStreet} editable={false} />

          <View style={[styles.rowContainer, styles.rowContainerStacing]}>
            <View style={styles.narrowInputContainer}>
              <Text style={styles.label}>Número</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={number}
                  onChangeText={(text) => setNumber(text)} // Convert to string
                  keyboardType="numeric"
                  maxLength={8}
                />
              </View>
            </View>

            <View style={styles.halfWidthInputContainer}>
              <Text style={styles.label}>Complemento</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input]}  // Adicionando estilo de campo inativo
                  value={complement}
                  onChangeText={setComplement}
                />
              </View>
            </View>
          </View>

          {/* Progress Indicator */}
          {isFetching && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loaderText}>Buscando endereço...</Text>
            </View>
          )}

          {/* Botão de Loading */}
          <LoadingButton isLoading={isLoading} onPress={handleRegister} text="Cadastrar Endereço" />

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowContainerStacing: {
      marginBottom: 20,
      marginTop: 10
    },
    halfWidthInputContainer: {
      flex: 0.70,  // Rua ocupa 70% da largura
    },
    narrowInputContainer: {
      flex: 0.30,  // Número ocupa 30% da largura
      marginRight: 10,
    },
    halfWidthInputContainerCep: {
      flex: 0.30,  // CEP ocupa 30% da largura
      marginRight: 10,
    },
    narrowInputContainerState: {
      flex: 0.70,  // Estado ocupa 70% da largura
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.placeholder,
      paddingHorizontal: spacing.small,
      paddingVertical: spacing.small,
    },
    input: {
      flex: 1,
      fontSize: 15,
      color: '#333',
      marginVertical: 6
    },
    label: {
      fontSize: 16,
      color: colors.placeholder,
      marginBottom: 4,
      fontFamily: 'Roboto-Regular',
    },
    cancelText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
    loaderContainer: {
      position: 'absolute',  // Coloca o loader sobre outros componentes
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,  // Preenche toda a tela
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,  // Garantir que o indicador de progresso fique sobre outros componentes
    },
    loaderText: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });