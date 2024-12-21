import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, ScrollView, StyleSheet } from 'react-native';
import CustomInput from '../../components/customInput/index';
import LoadingButton from '../../components/loadingButton/index';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
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

         {/* Novo componente para os campos "Rua" e "Número" lado a lado */}
         <View style={styles.rowContainer}>
          <View style={styles.halfWidthInputContainerCep}>
            <Text style={styles.label}>CEP</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={cep}
                onChangeText={setCep}
                maxLength={8}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.narrowInputContainerState}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={state}
                onChangeText={setState}
              />
            </View>
          </View>
        </View>

        <CustomInput label="Cidade" value={city} onChangeText={setCity} />
        <CustomInput label="Bairro" value={district} onChangeText={setDistrict} />

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
                maxLength={8}
              />
            </View>
          </View>
        </View>

        <CustomInput label="Complemento" value={complement} onChangeText={setComplement} />

        <LoadingButton isLoading={isLoading} onPress={handleRegister} text="Cadastrar Endereço" />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}