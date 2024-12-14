import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { styles } from "./styles";
// import { fetchDeliveryAddresses } from "../../api/addressService"; // função para buscar endereços da API (a ser implementada)

export default function AddressModal({ visible, onClose, onAddAddress }) {
    const [addresses, setAddresses] = useState([]);

    // Função para buscar endereços
    // const fetchAddresses = async () => {
    //     try {
    //         const data = await fetchDeliveryAddresses(); // Função que pega os endereços da API
    //         setAddresses(data);
    //     } catch (error) {
    //         console.error("Erro ao buscar endereços:", error);
    //     }
    // };

    // useEffect(() => {
    //     if (visible) {
    //         fetchAddresses();
    //     }
    // }, [visible]);

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Selecione o endereço de entrega</Text>

                {addresses.length > 0 ? (
                    <FlatList
                        data={addresses}
                        renderItem={({ item }) => (
                            <View style={styles.addressCard}>
                                <Text>{item.address}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                ) : (
                    <View style={styles.noAddresses}>
                        <Text>Ops, parece que não existe nenhum endereço cadastrado.</Text>
                        <TouchableOpacity onPress={onAddAddress} style={styles.addAddressButton}>
                            <Text style={styles.addAddressButtonText}>Cadastrar endereço de entrega</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}


