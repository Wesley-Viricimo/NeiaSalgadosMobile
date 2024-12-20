import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { AddressService } from "../../api/service/AddressService";
import AddressCard from "../addressCard/index";
import LoadingAnimation from "../loadingAnimation/index";

export default function AddressModal({ visible, onClose, onAddAddress, onSelectAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchAddresses = async (page) => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await AddressService.fetchUserAddres(page);
      if (data && data.data && data.data.length > 0) {
        setAddresses((prevAddresses) => [...prevAddresses, ...data.data]);
        setHasMore(data.data.length === 10);
      }
    } catch (error) {
      console.error("Erro ao buscar endereços:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      setAddresses([]);
      setPage(1);
      setHasMore(true);
      fetchAddresses(1);
    }
  }, [visible]);

  const handleEndReached = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchAddresses(nextPage);
        return nextPage;
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Selecione o endereço de entrega</Text>

        {loading && addresses.length === 0 ? (
          <LoadingAnimation />
        ) : (
          <>
            {addresses.length > 0 ? (
              <FlatList
                data={addresses}
                renderItem={({ item }) => (
                  <AddressCard
                    address={{ ...item, type: "casa" }}
                    isClickable={true} // Permite clique
                    onSelect={onSelectAddress} // Função de seleção
                  />
                )}
                keyExtractor={(item) => item.idAddress.toString()}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <Text>Carregando...</Text> : null}
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