import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert, ToastAndroid } from "react-native";
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

export default function FinishOrder() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("entrega");
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentOption, setPaymentOption] = useState("pagarEntrega");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [additionals, setAdditionals] = useState([]);
  const [selectedAdditionals, setSelectedAdditionals] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [additionalTotal, setAdditionalTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Função para buscar adicionais da API
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
  const handleFinishOrder = () => {
    Alert.alert("Pedido Realizado", "Seu pedido foi realizado com sucesso!");
  };

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

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
        {/* Se opção for entrega, exibe botão de seleção de endereço */}
        {selectedOption === "entrega" && (
          <>
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
          </>
        )}

        {/* Exibindo informações do endereço de retirada */}
        {selectedOption === "retirada" && (
          // <AddressCard address={{type: "casa", road: "R Antônio Luiz do Prado, 55", district:"Jardim das Oliveiras", city: "Paraguaçu Paulista", state: "São Paulo"}} isClickable={false}/>
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
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {selectedOption === "entrega" ? "Tempo estimado para entrega:" : "Tempo estimado para retirada:"}
          </Text>
          <Text style={styles.timeValue}>
            {selectedOption === "entrega" ? "Hoje, de 50 a 60 min" : "Hoje, de 40 a 50 min"}
          </Text>
        </View>

        {/* Linha de separação */}
        <View style={styles.separator} />

        {/* Seção de Pagamento */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentText}>Pagamento</Text>

          <TouchableOpacity onPress={() => setPaymentOption("pagarEntrega")}>
            <Text style={styles.paymentOptionText}>
              {selectedOption === "entrega" ? "Pagar na entrega" : "Pagar na retirada"}
            </Text>
            {paymentOption === "pagarEntrega" && <View style={styles.selectedPaymentOptionLine} />}
          </TouchableOpacity>

          <Text style={styles.choosePaymentText}>Escolha a forma de pagamento</Text>

          <View style={styles.radioGroupContainer}>
            <TouchableOpacity
              style={[styles.radioOption, selectedPaymentMethod === "dinheiro" && styles.selectedPaymentOption]}
              onPress={() => setSelectedPaymentMethod("dinheiro")}
            >
              <Icon name="attach-money" size={24} color={selectedPaymentMethod === "dinheiro" ? "#FF4500" : "#000"} />
              <Text style={styles.radioOptionText}>Dinheiro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioOption, selectedPaymentMethod === "cartao" && styles.selectedPaymentOption]}
              onPress={() => setSelectedPaymentMethod("cartao")}
            >
              <Icon name="credit-card" size={24} color={selectedPaymentMethod === "cartao" ? "#FF4500" : "#000"} />
              <Text style={styles.radioOptionText}>Cartão</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioOption, selectedPaymentMethod === "pix" && styles.selectedPaymentOption]}
              onPress={() => setSelectedPaymentMethod("pix")}
            >
              <Icon name="account-balance-wallet" size={24} color={selectedPaymentMethod === "pix" ? "#FF4500" : "#000"} />
              <Text style={styles.radioOptionText}>Pix</Text>
            </TouchableOpacity>
          </View>

          {/* Seção de Adicionais */}
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

          {/* Resumo do Pedido */}
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

          {/* 4 Linhas de Informações */}
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
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handleFinishOrder}
          >
            <Text style={styles.placeOrderButtonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
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
          console.log("Cadastrar novo endereço");
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}