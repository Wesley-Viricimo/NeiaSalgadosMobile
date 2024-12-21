import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, ScrollView, StyleSheet } from 'react-native';
import CustomInput from '../../components/customInput/index';
import LoadingButton from '../../components/loadingButton/index';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export default function AddressRegistration() {
  const navigation = useNavigation();

  const [cep, setCep] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!cep || !state || !city || !district || !street || !number) {
      return Alert.alert('Erro', 'Os campos obrigatórios devem ser preenchidos!');
    }

    setIsLoading(true);
    try {
      // const response = await AddressService.registerAddress({
      //     cep,
      //     state,
      //     city,
      //     district,
      //     street,
      //     number,
      //     complement,
      // });

      // if (response.status === 201) {
      //     Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');
      //     navigation.goBack();
      // } else {
      //     Alert.alert('Erro', response.message || 'Erro ao cadastrar endereço.');
      // }
    } catch (error) {
      Alert.alert('Erro', 'Erro inesperado ao cadastrar endereço.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Cadastro de Endereço</Text>

        <CustomInput label="CEP" value={cep} onChangeText={setCep} icon="location" />
        <CustomInput label="Estado" value={state} onChangeText={setState} icon="flag" />
        <CustomInput label="Cidade" value={city} onChangeText={setCity} icon="business" />
        <CustomInput label="Bairro" value={district} onChangeText={setDistrict} icon="home" />

        {/* Novo componente para os campos "Rua" e "Número" lado a lado */}
        <View style={styles.rowContainer}>
          <View style={styles.halfWidthInputContainer}>
            <Text style={styles.label}>Rua</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={street}
                onChangeText={setStreet}
              />
            </View>
          </View>

          <View style={styles.narrowInputContainer}>
            <Text style={styles.label}>Número</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <CustomInput label="Complemento" value={complement} onChangeText={setComplement} icon="home" />

        <LoadingButton isLoading={isLoading} onPress={handleRegister} text="Cadastrar Endereço" />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}