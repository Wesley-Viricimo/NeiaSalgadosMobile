import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { AddressService } from "../../api/service/AddressService"; // função para buscar endereços da API
import AddressCard from "../addressCard/index"; // Componente de card de endereço
import LoadingAnimation from "../loadingAnimation/index"; // Componente de loading

export default function AddressModal({ visible, onClose, onAddAddress }) {
    const [addresses, setAddresses] = useState([]);
    const [page, setPage] = useState(1); // Página inicial
    const [loading, setLoading] = useState(false); // Indicador de carregamento
    const [hasMore, setHasMore] = useState(true); // Indicador de se há mais endereços para carregar

    // Função para buscar endereços com paginação
    const fetchAddresses = async (page) => {
        if (loading) return; // Impede novas requisições enquanto está carregando
        setLoading(true);

        try {
            const data = await AddressService.fetchUserAddres(page); // Passa a página para a API
            
            if (data && data.data && data.data.length > 0) {
                setAddresses((prevAddresses) => [...prevAddresses, ...data.data]); // Adiciona novos endereços
                setHasMore(data.data.length === 10); // Se retornou 10 itens, há mais para carregar
            }
        } catch (error) {
            console.error("Erro ao buscar endereços:", error);
        } finally {
            setLoading(false);
        }
    };

    // Carregar os endereços quando o modal for aberto
    useEffect(() => {
        if (visible) {
            setAddresses([]); // Limpa os endereços ao abrir o modal
            setPage(1); // Reseta a página
            setHasMore(true); // Garantir que há mais endereços
            fetchAddresses(1); // Buscar a primeira página de endereços
        }
    }, [visible]);

    // Função chamada quando o usuário chega no final da lista
    const handleEndReached = () => {
        if (hasMore && !loading) {
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                fetchAddresses(nextPage); // Busca a próxima página
                return nextPage;
            });
        }
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Selecione o endereço de entrega</Text>

                {loading && addresses.length === 0 ? ( // Exibe o loading enquanto os endereços estão sendo carregados
                    <LoadingAnimation />
                ) : (
                    <>
                        {addresses.length > 0 ? (
                            <FlatList
                                data={addresses}
                                renderItem={({ item }) => (
                                    <AddressCard address={{ ...item, type: "casa" }} /> // Adiciona 'type' fixo como "casa"
                                )}
                                keyExtractor={(item) => item.idAddress.toString()}
                                onEndReached={handleEndReached} // Chama quando chegar ao final
                                onEndReachedThreshold={0.5} // Limite para quando carregar mais
                                ListFooterComponent={loading ? <Text>Carregando...</Text> : null} // Mostra "Carregando..." enquanto espera
                            />
                        ) : (
                            <View style={styles.noAddresses}>
                                <Text>Ops, parece que não existe nenhum endereço cadastrado.</Text>
                                <TouchableOpacity onPress={onAddAddress} style={styles.addAddressButton}>
                                    <Text style={styles.addAddressButtonText}>Cadastrar endereço de entrega</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                )}

                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}