import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ToastAndroid, Animated } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AddressModal from "../../components/addressModal/index";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressCard from "../../components/addressCard/index";
import { styles } from "./styles";
import AdditionalOption from "../../components/additionalOption";
import { OrderService } from "../../api/service/OrderService";
import OrderItemCard from "../../components/orderItemCard/index";
import { getAllOrderItem, removeOrderItemById } from "../../database/orderItemService";
import LoadingButton from "../../components/loadingButton";

export default function FinishOrder() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentOption, setPaymentOption] = useState("pagarEntrega");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [additionals, setAdditionals] = useState([]);
  const [selectedAdditionals, setSelectedAdditionals] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [additionalTotal, setAdditionalTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para controle do carregamento

  // Animações
  const fadeAnim = useState(new Animated.Value(0))[0]; // Opacidade (de 0 a 1)
  const translateAnim = useState(new Animated.Value(30))[0]; // Deslocamento (de 30 para 0)

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
        const items = await getAllOrderItem();
        setOrderItems(items);
        calculateSubtotal(items);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchAdditionals();
    fetchOrderItems();

    // Animações de fade-in e translação
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Função para calcular o subtotal
  const calculateSubtotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity * item.price;
    });
    setSubtotal(total);
  };

  // Função para calcular o valor total dos adicionais selecionados
  const calculateAdditionalTotal = (newSelected = selectedAdditionals) => {
    let total = 0;
    additionals.forEach((additional) => {
      if (newSelected[additional.idAdditional]) {
        total += additional.price;
      }
    });
    setAdditionalTotal(total); // Atualiza o total
  };

  // Função para alterar a seleção do adicional
  const handleAdditionalSelection = (id) => {
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
  const handleRemoveProduct = async (id) => {
    try {
      await removeOrderItemById(id);

      const updatedItems = await getAllOrderItem();
      setOrderItems(updatedItems);
      calculateSubtotal(updatedItems); // Recalcula o subtotal após a remoção

      if (updatedItems.length === 0) {
        ToastAndroid.show("Produtos removidos do carrinho!", ToastAndroid.SHORT);
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomRoutes' }], // Redireciona para a tela inicial, por exemplo
        });
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
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula um delay de 2 segundos
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
      <Animated.View
        style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: translateAnim }] }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Finalize seu Pedido</Text>
      </Animated.View>

      {/* Opções de entrega e retirada */}
      <Animated.View
        style={[styles.tabContainer, { opacity: fadeAnim, transform: [{ translateY: translateAnim }] }]}
      >
        <TouchableOpacity
          style={[styles.tab, selectedOption === 0 && styles.selectedTab]} // Estilização tipo entrega
          onPress={() => setSelectedOption(0)}  // 0 = entrega
        >
          <Text style={[styles.tabText, selectedOption === 0 && styles.selectedTabText]}>
            Entrega
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedOption === 1 && styles.selectedTab]} // Estilização tipo retira
          onPress={() => setSelectedOption(1)} // 1 = retirada
        >
          <Text style={[styles.tabText, selectedOption === 1 && styles.selectedTabText]}>
            Retirada
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
        {/* Se opção for entrega, exibe botão de seleção de endereço */}
        {selectedOption === 0 && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }]
            }}
          >
            <TouchableOpacity style={styles.selectAddressButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.selectAddressButtonText}>
                {selectedAddress ? "Alterar endereço de entrega" : "Selecione o endereço de entrega"}
              </Text>
            </TouchableOpacity>
            {selectedAddress ? (
              <AddressCard address={selectedAddress} isClickable={false} /> // Exibe o endereço selecionado
            ) : (
              <Text style={styles.noAddressText}>Nenhum endereço selecionado</Text>
            )}
          </Animated.View>
        )}

        {/* Exibindo informações do endereço de retirada */}
        {selectedOption === 1 && (
          <View style={styles.pickupAddressContainer}>
            <View style={styles.iconContainer}>
              <Icon name="place" size={24} color="#000" />
            </View>
            <View style={styles.addressTextContainer}>
              <Text style={styles.pickupTextBold}>Retire seu pedido em:</Text>
              <Text style={styles.pickupText}>R Antônio Luiz do Prado, 55</Text>
              <Text style={styles.pickupText}>Jardim das Oliveiras</Text>
              <Text style={styles.pickupText}>Paraguaçu Paulista - São Paulo</Text>
            </View>
          </View>
        )}

        {/* Tempo estimado para entrega ou retirada */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: translateAnim }] }}
        >
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {selectedOption === 0 ? "Tempo estimado para entrega:" : "Tempo estimado para retirada:"}
            </Text>
            <Text style={styles.timeValue}>
              {selectedOption === 0 ? "Hoje, de 50 a 60 min" : "Hoje, de 40 a 50 min"}
            </Text>
          </View>
        </Animated.View>

        {/* Linha de separação */}
        <View style={styles.separator} />

        {/* Seção de Pagamento */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: translateAnim }] }}
        >
          <View style={styles.paymentSection}>
            <Text style={styles.paymentText}>Pagamento</Text>

            <TouchableOpacity onPress={() => setPaymentOption("pagarEntrega")}>
              <Text style={styles.paymentOptionText}>
                {selectedOption === 0 ? "Pagar na entrega" : "Pagar na retirada"}
              </Text>
              {paymentOption === "pagarEntrega" && <View style={styles.selectedPaymentOptionLine} />}
            </TouchableOpacity>

            <Text style={styles.choosePaymentText}>Escolha a forma de pagamento</Text>

            <View style={styles.radioGroupContainer}>
              <TouchableOpacity
                style={[styles.radioOption, selectedPaymentMethod === 0 && styles.selectedPaymentOption]} //Estilização para dinheiro
                onPress={() => setSelectedPaymentMethod(0)} // 0 = dinheiro
              >
                <Icon name="attach-money" size={24} color={selectedPaymentMethod === 0 ? "#FF4500" : "#000"} />
                <Text style={styles.radioOptionText}>Dinheiro</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.radioOption, selectedPaymentMethod === 2 && styles.selectedPaymentOption]} //Estilização para cartão
                onPress={() => setSelectedPaymentMethod(2)} // 2 = cartão
              >
                <Icon name="credit-card" size={24} color={selectedPaymentMethod === 2 ? "#FF4500" : "#000"} />
                <Text style={styles.radioOptionText}>Cartão</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.radioOption, selectedPaymentMethod === 1 && styles.selectedPaymentOption]} //Estilização para pix
                onPress={() => setSelectedPaymentMethod(1)} // 1 = pix
              >
                <Icon name="account-balance-wallet" size={24} color={selectedPaymentMethod === 1 ? "#FF4500" : "#000"} />
                <Text style={styles.radioOptionText}>Pix</Text>
              </TouchableOpacity>
            </View>

            {/* Verifica se existem adicionais antes de renderizar o texto e os itens */}
            {additionals.length > 0 && (
              <>
                <Text style={styles.choosePaymentText}>Adicionais</Text>
                {additionals.map((additional) => (
                  <AdditionalOption
                    key={additional.idAdditional}
                    title={additional.description}
                    price={additional.price}
                    checked={selectedAdditionals[additional.idAdditional] || false}
                    onPress={() => handleAdditionalSelection(additional.idAdditional)}
                  />
                ))}
              </>
            )}

          </View>
        </Animated.View>

        {/* Resumo do Pedido */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: translateAnim }] }}
        >
          <View style={styles.orderItemsSection}>
            <Text style={styles.orderItemsTitle}>Resumo do pedido</Text>
            {orderItems.map((item) => (
              <OrderItemCard
                key={item.id}
                description={item.description}
                quantity={item.quantity}
                price={item.price}
                onRemove={() => handleRemoveProduct(item.id)}
              />
            ))}
          </View>
        </Animated.View>

        {/* 4 Linhas de Informações */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: translateAnim }] }}
        >
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal:</Text>
              <Text style={styles.summaryPrice}>R$ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Adicionais:</Text>
              <Text style={styles.summaryPrice}>R$ {additionalTotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Taxa de entrega:</Text>
              <Text style={styles.summaryPrice}>R$ {deliveryFee.toFixed(2)}</Text>
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

        </Animated.View>
      </ScrollView>

      <AddressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectAddress={(address) => {
          setSelectedAddress(address);
          setModalVisible(false);
        }}
        onAddAddress={() => {
          navigation.navigate("AddressRegistration");
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}