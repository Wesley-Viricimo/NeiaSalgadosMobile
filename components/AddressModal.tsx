import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { AddressService } from "@/api/service/AddressService";
import AddressCard from "./AddressCard";
import LoadingAnimation from "./LoadingAnimation";
import { StyleSheet } from "react-native";
import { Address } from "@/types/FinishOrderTypes";

interface AddressModalProps {
    visible: boolean;
    onClose: () => void;
    onAddAddress: () => void;
    onSelectAddress: (address: Address) => void;
}

export default function AddressModal({ visible, onClose, onAddAddress, onSelectAddress }: AddressModalProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchAddresses = async (page: number) => {
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
                keyExtractor={(item: any) => item.idAddress.toString()}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  loading ? <Text>Carregando...</Text> : null
                }
              />
            ) : (
              <View style={styles.noAddresses}>
                <Text>
                  Ops, parece que não existe nenhum endereço cadastrado.
                </Text>
                <TouchableOpacity
                  onPress={onAddAddress}
                  style={styles.addAddressButton}
                >
                  <Text style={styles.addAddressButtonText}>
                    Cadastrar endereço de entrega
                  </Text>
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#ffffff", // Fundo branco limpo
    padding: 20,
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 22, // Título maior
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2c3e50",
  },
  addressCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f8f9fa", // Fundo leve
    borderRadius: 10, // Cantos arredondados
    borderWidth: 1,
    borderColor: "#e1e4e8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  noAddresses: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  addAddressButton: {
    marginTop: 20,
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#1e90ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addAddressButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#dcdcdc", // Cor neutra
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    textAlign: "center",
    color: "#2c3e50", // Texto escuro
    fontSize: 16,
    fontWeight: "500",
  },
});
