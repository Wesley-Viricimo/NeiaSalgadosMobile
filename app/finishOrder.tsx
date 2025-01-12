import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ToastAndroid, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddressModal from "@/components/AddressModal";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressCard from "@/components/AddressCard";
import AdditionalOption from "@/components/AdditionalOption";
import { OrderService } from "@/api/service/OrderService";
import OrderItemCard from "@/components/OrderItemCard";
import { getAllOrderItem, removeOrderItemById } from "@/database/orderItemService";
import LoadingButton from "@/components/LoadingButton";
import { useRouter } from "expo-router";
import { eventEmitter } from "@/utils/eventEmitter";
import { Additional, OrderItem } from "@/types/FinishOrderTypes";

export default function FinishOrder() {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentOption, setPaymentOption] = useState("pagarEntrega");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [additionals, setAdditionals] = useState<Additional[]>([]);
  const [selectedAdditionals, setSelectedAdditionals] = useState<{ [key: number]: boolean }>({});
  const [orderItems, setOrderItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [additionalTotal, setAdditionalTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controle do carregamento

  useEffect(() => {
    const fetchAdditionals = async () => {
      try {
        const response = await OrderService.getAdditionals();
        if (response.status === 200) {
          setAdditionals(response.data);
        } else {
          Alert.alert("Erro", "Não foi possível carregar os adicionais.");
        }
      } catch (error) {
        console.error("Erro ao buscar adicionais!", error);
      }
    };

    const fetchOrderItems = async () => {
      try {
        const items: any = await getAllOrderItem();
        setOrderItems(items);
        calculateSubtotal(items);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchAdditionals();
    fetchOrderItems();
  }, []);

  // Função para calcular o subtotal
  const calculateSubtotal = (items: OrderItem[]) => {
    let total = 0;
    items.forEach((item: OrderItem) => {
      total += item.quantity * item.price;
    });
    setSubtotal(total);
  };

  // Função para calcular o valor total dos adicionais selecionados
  const calculateAdditionalTotal = (newSelected = selectedAdditionals) => {
    let total = 0;
    additionals.forEach((additional: Additional) => {
      if (newSelected[additional.idAdditional]) {
        total += additional.price;
      }
    });
    setAdditionalTotal(total); // Atualiza o total
  };

  // Função para alterar a seleção do adicional
  const handleAdditionalSelection = (id: number) => {
    setSelectedAdditionals((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[id]) {
        delete newSelected[id]; // Desmarcar
      } else {
        newSelected[id] = true; // Marcar
      }
      calculateAdditionalTotal(newSelected);
      return newSelected;
    });
  };

  // Função para remover um produto do banco de dados e atualizar a lista de itens
  const handleRemoveProduct = async (id: number) => {
    try {
      await removeOrderItemById(id);

      const updatedItems: any = await getAllOrderItem();
      setOrderItems(updatedItems);
      calculateSubtotal(updatedItems); // Recalcula o subtotal após a remoção

      if (updatedItems.length === 0) {
        ToastAndroid.show("Produtos removidos do carrinho!", ToastAndroid.SHORT);

        router.back();
        eventEmitter.emit("productUpdated");
      }
    } catch (error) {
      ToastAndroid.show("Erro ao remover o produto!", ToastAndroid.LONG);
      console.error(error);
    }
  };

  const deliveryFee = 0; // Taxa fixa de entrega por enquanto
  const total = subtotal + additionalTotal + deliveryFee; // Cálculo do valor total

  // Função para finalizar o pedido
  const handleFinishOrder = async () => {
    setIsLoading(true); // Ativa o estado de carregamento
    try {
      console.log("paymentMethod", selectedPaymentMethod);
      console.log("typeOfDelivery", selectedOption);
      console.log("address", selectedAddress);
      console.log("orderItems", orderItems);
      console.log("additionals", selectedAdditionals);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula um delay de 2 segundos
      Alert.alert("Pedido Realizado", "Seu pedido foi realizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao finalizar o pedido.");
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento após a operação
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header fixo */}
      <View
        style={[
          styles.header
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Finalize seu Pedido</Text>
      </View>

      {/* Opções de entrega e retirada */}
      <View
        style={[
          styles.tabContainer
        ]}
      >
        <TouchableOpacity
          style={[styles.tab, selectedOption === 0 && styles.selectedTab]} // Estilização tipo entrega
          onPress={() => setSelectedOption(0)} // 0 = entrega
        >
          <Text
            style={[
              styles.tabText,
              selectedOption === 0 && styles.selectedTabText,
            ]}
          >
            Entrega
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedOption === 1 && styles.selectedTab]} // Estilização tipo retira
          onPress={() => setSelectedOption(1)} // 1 = retirada
        >
          <Text
            style={[
              styles.tabText,
              selectedOption === 1 && styles.selectedTabText,
            ]}
          >
            Retirada
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* Se opção for entrega, exibe botão de seleção de endereço */}
        {selectedOption === 0 && (
          <View>
            <TouchableOpacity
              style={styles.selectAddressButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.selectAddressButtonText}>
                {selectedAddress
                  ? "Alterar endereço de entrega"
                  : "Selecione o endereço de entrega"}
              </Text>
            </TouchableOpacity>
            {selectedAddress ? (
              <AddressCard address={selectedAddress} isClickable={false} /> // Exibe o endereço selecionado
            ) : (
              <Text style={styles.noAddressText}>
                Nenhum endereço selecionado
              </Text>
            )}
          </View>
        )}

        {/* Exibindo informações do endereço de retirada */}
        {selectedOption === 1 && (
          <View style={styles.pickupAddressContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="play-back" size={24} color="#000" />
            </View>
            <View style={styles.addressTextContainer}>
              <Text style={styles.pickupTextBold}>Retire seu pedido em:</Text>
              <Text style={styles.pickupText}>R Antônio Luiz do Prado, 55</Text>
              <Text style={styles.pickupText}>Jardim das Oliveiras</Text>
              <Text style={styles.pickupText}>
                Paraguaçu Paulista - São Paulo
              </Text>
            </View>
          </View>
        )}

        {/* Tempo estimado para entrega ou retirada */}
        <View
        >
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {selectedOption === 0
                ? "Tempo estimado para entrega:"
                : "Tempo estimado para retirada:"}
            </Text>
            <Text style={styles.timeValue}>
              {selectedOption === 0
                ? "Hoje, de 50 a 60 min"
                : "Hoje, de 40 a 50 min"}
            </Text>
          </View>
        </View>

        {/* Linha de separação */}
        <View style={styles.separator} />

        {/* Seção de Pagamento */}
        <View>
          <View style={styles.paymentSection}>
            <Text style={styles.paymentText}>Pagamento</Text>

            <TouchableOpacity onPress={() => setPaymentOption("pagarEntrega")}>
              <Text style={styles.paymentOptionText}>
                {selectedOption === 0
                  ? "Pagar na entrega"
                  : "Pagar na retirada"}
              </Text>
              {paymentOption === "pagarEntrega" && (
                <View style={styles.selectedPaymentOptionLine} />
              )}
            </TouchableOpacity>

            <Text style={styles.choosePaymentText}>
              Escolha a forma de pagamento
            </Text>

            <View style={styles.radioGroupContainer}>
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  selectedPaymentMethod === "0" && styles.selectedPaymentOption,
                ]} //Estilização para dinheiro
                onPress={() => setSelectedPaymentMethod("0")} // 0 = dinheiro
              >
                <Ionicons
                  name="moon"
                  size={24}
                  color={selectedPaymentMethod === "0" ? "#FF4500" : "#000"}
                />
                <Text style={styles.radioOptionText}>Dinheiro</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioOption,
                  selectedPaymentMethod === "2" && styles.selectedPaymentOption,
                ]} //Estilização para cartão
                onPress={() => setSelectedPaymentMethod("2")} // 2 = cartão
              >
                <Ionicons
                  name="card"
                  size={24}
                  color={selectedPaymentMethod === "2" ? "#FF4500" : "#000"}
                />
                <Text style={styles.radioOptionText}>Cartão</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioOption,
                  selectedPaymentMethod === "1" && styles.selectedPaymentOption,
                ]} //Estilização para pix
                onPress={() => setSelectedPaymentMethod("")} // 1 = pix
              >
                <Ionicons
                  name="accessibility"
                  size={24}
                  color={selectedPaymentMethod === "1" ? "#FF4500" : "#000"}
                />
                <Text style={styles.radioOptionText}>Pix</Text>
              </TouchableOpacity>
            </View>

            {/* Verifica se existem adicionais antes de renderizar o texto e os itens */}
            {additionals.length > 0 && (
              <>
                <Text style={styles.choosePaymentText}>Adicionais</Text>
                {additionals.map((additional: Additional) => (
                  <AdditionalOption
                    key={additional.idAdditional}
                    title={additional.description}
                    price={additional.price}
                    checked={
                      selectedAdditionals[additional.idAdditional] || false
                    }
                    onPress={() =>
                      handleAdditionalSelection(additional.idAdditional)
                    }
                  />
                ))}
              </>
            )}
          </View>
        </View>

        {/* Resumo do Pedido */}
        <View>
          <View style={styles.orderItemsSection}>
            <Text style={styles.orderItemsTitle}>Resumo do pedido</Text>
            {orderItems.map((item: OrderItem) => (
              <OrderItemCard
                key={item.id}
                description={item.description}
                quantity={item.quantity}
                price={item.price}
                onRemove={() => handleRemoveProduct(item.id)}
              />
            ))}
          </View>
        </View>

        {/* 4 Linhas de Informações */}
        <View>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal:</Text>
              <Text style={styles.summaryPrice}>R$ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Adicionais:</Text>
              <Text style={styles.summaryPrice}>
                R$ {additionalTotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Taxa de entrega:</Text>
              <Text style={styles.summaryPrice}>
                R$ {deliveryFee.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Total:</Text>
              <Text style={styles.summaryPrice}>R$ {total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Botão de Finalizar Pedido */}
          <LoadingButton
            isLoading={isLoading} // Passa o estado isLoading para o botão
            onPress={handleFinishOrder}
            text={"Finalizar Pedido"}
          />
        </View>
      </ScrollView>

      <AddressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectAddress={(address) => {
          setSelectedAddress(address);
          setModalVisible(false);
        }}
        onAddAddress={() => {
        //   router.navigate("AddressRegistration");
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    padding: 15,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderBottomWidth: 2,
    borderColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedTab: {
    borderBottomWidth: 3,
    borderColor: "#FF4500",
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  selectedTabText: {
    color: "#FF4500",
  },
  selectAddressButton: {
    marginTop: 20,
    backgroundColor: "#FF4500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 30,
  },
  selectAddressButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },

  // Estilos para o conteúdo scrollável
  scrollContent: {
    padding: 5,
  },
  scrollContentContainer: {
    paddingBottom: 20, // Adiciona um pouco de espaço no final do conteúdo
  },
  pickupAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: "#ffffff", // Fundo branco para destaque
    padding: 20, // Espaçamento interno maior
    borderRadius: 10, // Cantos arredondados para suavidade
    shadowColor: "#000", // Sombra para criar profundidade
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Para sombra no Android
  },
  iconContainer: {
    marginRight: 20, // Mais espaço entre o ícone e o texto
    justifyContent: "center",
  },
  addressTextContainer: {
    flex: 1,
  },
  pickupTextBold: {
    fontWeight: "bold",
    fontSize: 20, // Fonte maior para destacar o título
    color: "#2c3e50", // Cor moderna e vibrante
    marginBottom: 8, // Espaçamento para o próximo texto
  },
  pickupText: {
    fontSize: 17, // Fonte maior para melhor legibilidade
    color: "#7f8c8d", // Cor suave para complementar o título
    marginBottom: 4, // Espaçamento entre as linhas do endereço
  },
  // Estilos para tempo estimado
  timeContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  timeValue: {
    fontSize: 18,
    color: "#555",
  },

  // Linha de separação
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 20,
    marginHorizontal: 15,
  },

  // Estilos para pagamento
  paymentSection: {
    marginHorizontal: 15,
  },
  paymentText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },

  paymentOptionText: {
    fontSize: 18,
    color: "#FF4500",
    paddingLeft: 10,
  },

  // Estilo para o sublinhado
  selectedPaymentOptionLine: {
    height: 2, // Altura do sublinhado
    backgroundColor: "#FF4500", // Cor do sublinhado
    marginTop: 5, // Espaçamento entre o texto e a linha
    width: "45%", // Largura do sublinhado, ajustada ao texto
    alignSelf: "flex-start", // Alinha o sublinhado com o texto
  },

  // Novo texto para escolher forma de pagamento
  choosePaymentText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    color: "#333",
  },

  // Contêiner das opções de pagamento
  radioGroupContainer: {
    marginTop: 10,
  },

  // Estilos para cada opção de pagamento
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#ccc", // Cor padrão da borda
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  // Estilos para opção de pagamento selecionada
  selectedPaymentOption: {
    borderColor: "#FF4500", // Cor da borda quando selecionado
  },

  radioOptionText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },

  // Estilos para o modal de endereço
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalCloseButton: {
    padding: 5,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: "#FF4500",
  },
  modalBody: {
    marginBottom: 20,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  orderItemsSection: {
    marginTop: 30,
  },
  // Estilo para o título da seção de itens do pedido
  orderItemsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Cor escura para o título
    marginBottom: 15, // Espaçamento entre o título e os itens
  },
  // Estilo para cada item do pedido (quando renderizado pelo OrderItemCard)
  orderItemCardContainer: {
    marginBottom: 15, // Espaçamento entre os itens do pedido
    backgroundColor: "#fff", // Fundo branco para cada item
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0", // Borda sutil
  },
  orderItemCardText: {
    fontSize: 16,
    color: "#333", // Cor escura para o texto
  },
  orderItemCardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF4500", // Cor laranja para o preço
  },
  summaryContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  // Linha do resumo (cada linha com rótulo e valor)
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  // Texto do rótulo (ex: "Subtotal:", "Adicionais:", etc.)
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Cor escura para os rótulos
  },
  // Texto do valor (ex: "R$ 30.00", etc.)
  summaryPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Cor laranja para destacar o preço
  },
  // Caso queira uma linha de separação final, pode adicionar aqui
  summaryRowLast: {
    borderBottomWidth: 0, // Remover a linha divisória na última linha
  },
  placeOrderButton: {
    backgroundColor: "#FF4500", // Cor de fundo do botão (laranja)
    paddingVertical: 14, // Espaçamento interno vertical
    paddingHorizontal: 30, // Espaçamento interno horizontal
    borderRadius: 8, // Bordas arredondadas
    marginTop: 30, // Margem superior
    alignItems: "center", // Alinha o texto ao centro
    justifyContent: "center", // Justifica o conteúdo ao centro
  },
  placeOrderButtonText: {
    fontSize: 18, // Tamanho da fonte
    fontWeight: "bold", // Negrito
    color: "#fff", // Cor do texto (branco)
  },
  noAddressText: {
    marginTop: 20,
    fontSize: 16,
    color: "#FF0000", // Cor vermelha para destacar o texto
    textAlign: "center", // Centraliza o texto
  },
});
