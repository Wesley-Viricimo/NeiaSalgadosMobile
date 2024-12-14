import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AddressModal from "../../components/addressModal"; // Importando o novo componente de Modal
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function FinishOrder() {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState("entrega");  // Set default option to "entrega"
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header fixo */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Finalize seu Pedido</Text>
            </View>

            {/* Opções de entrega e retirada */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedOption === "entrega" && styles.selectedTab]}
                    onPress={() => setSelectedOption("entrega")}
                >
                    <Text style={[styles.tabText, selectedOption === "entrega" && styles.selectedTabText]}>
                        Entrega
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedOption === "retirada" && styles.selectedTab]}
                    onPress={() => setSelectedOption("retirada")}
                >
                    <Text style={[styles.tabText, selectedOption === "retirada" && styles.selectedTabText]}>
                        Retirada
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Botão de Seleção de Endereço (aparece apenas se Entrega for selecionada) */}
            {selectedOption === "entrega" && (
                <TouchableOpacity style={styles.selectAddressButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.selectAddressButtonText}>Selecione o endereço de entrega</Text>
                </TouchableOpacity>
            )}

            {/* ScrollView para conteúdo principal */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Aqui você pode adicionar outros campos ou componentes para a finalização do pedido */}
            </ScrollView>

            {/* Modal de Endereço */}
            <AddressModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAddAddress={() => {
                    // Função para cadastrar um novo endereço
                    console.log("Cadastrar novo endereço");
                    setModalVisible(false); // Fecha o modal após adicionar o endereço
                }}
            />
        </SafeAreaView>
    );
}