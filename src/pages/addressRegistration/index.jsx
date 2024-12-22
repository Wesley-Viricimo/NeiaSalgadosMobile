import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, ScrollView, ActivityIndicator, Animated } from 'react-native';
import CustomInput from '../../components/customInput/index';
import LoadingButton from '../../components/loadingButton/index';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { AddressService } from '../../api/service/AddressService';
import { colors } from '../../global/styles';

export default function AddressRegistration() {
  const navigation = useNavigation();

  // Estados para os campos do endereço
  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);  // Estado para controlar se está fazendo a requisição do CEP

  // Estados para animação de entrada
  const fadeAnim = useState(new Animated.Value(0))[0]; // Opacidade inicial (0)
  const slideAnim = useState(new Animated.Value(30))[0]; // Posição inicial (fora da tela)

  // Função para buscar dados do endereço usando o CEP
  const fetchAddressData = async (cep) => {
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
  const handleCepChange = (cep) => {
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
      const response = await AddressService.createAddress({
        cep,
        state,
        city,
        district,
        road: street,
        number,
        complement,
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar endereço. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro inesperado ao cadastrar endereço.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para animar os componentes na montagem da tela
  useEffect(() => {
    // Animação de fade e slide logo após o componente ser montado
    Animated.timing(fadeAnim, {
      toValue: 1, // Alvo da opacidade
      duration: 1000, // Duração da animação
      useNativeDriver: true, // Utiliza a aceleração de hardware para uma animação mais fluida
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0, // Alvo da posição
      duration: 700, // Duração da animação
      useNativeDriver: true, // Utiliza a aceleração de hardware para uma animação mais fluida
    }).start();
  }, []); // Apenas uma vez quando o componente for montado

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Animação de fade e slide */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
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
                  onChangeText={setNumber}
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
          <LoadingButton isLoading={isLoading || isFetching} onPress={handleRegister} text="Cadastrar Endereço" />

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}