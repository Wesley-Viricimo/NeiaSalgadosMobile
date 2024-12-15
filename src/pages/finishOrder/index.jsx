import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AddressModal from "../../components/addressModal/index";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressCard from "../../components/addressCard/index";
import { styles } from "./styles";
import AdditionalOption from "../../components/additionalOption"; // Importando o componente de Adicional
import { OrderService } from "../../api/service/OrderService";
import OrderItemCard from "../../components/orderItemCard/index"; // Importando o novo componente OrderItemCard
import { getAllOrderItem } from "../../database/orderItemService";

export default function FinishOrder() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("entrega");
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentOption, setPaymentOption] = useState("pagarEntrega");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [additionals, setAdditionals] = useState([]); // Estado para armazenar os adicionais
  const [selectedAdditionals, setSelectedAdditionals] = useState({}); // Estado para armazenar os adicionais selecionados
  const [orderItems, setOrderItems] = useState([]); // Estado para armazenar os itens do pedido

  // Dados de endereço estáticos para visualização
  const staticAddress = {
    type: "casa",
    road: "Rua Hermínio Cavalari",
    number: "701",
    district: "Sítios de Recreio Panambi",
    city: "Marília",
    state: "São Paulo",
    complement: "Apartamento 926, bloco 9",
  };

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
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchAdditionals();
    fetchOrderItems();
  }, []);

  // Função para alterar a seleção do adicional
  const handleAdditionalSelection = (id) => {
    setSelectedAdditionals((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[id]) {
        delete newSelected[id]; // Desmarcar
      } else {
        newSelected[id] = true; // Marcar
      }
      return newSelected;
    });
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

      {/* Se opção for entrega, exibe botão de seleção de endereço */}
      {selectedOption === "entrega" && (
        <TouchableOpacity style={styles.selectAddressButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.selectAddressButtonText}>Selecione o endereço de entrega</Text>
        </TouchableOpacity>
      )}

      {/* Seção de conteúdo scrollável */}
      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
        {/* Exibindo as informações do endereço selecionado para entrega */}
        {selectedOption === "entrega" && staticAddress && (
          <AddressCard address={staticAddress} />
        )}

        {/* Exibindo informações do endereço de retirada */}
        {selectedOption === "retirada" && (
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

          {/* Opções de pagamento */}
          <TouchableOpacity onPress={() => setPaymentOption("pagarEntrega")}>
            <Text style={styles.paymentOptionText}>
              {selectedOption === "entrega" ? "Pagar na entrega" : "Pagar na retirada"}
            </Text>
            {paymentOption === "pagarEntrega" && <View style={styles.selectedPaymentOptionLine} />}
          </TouchableOpacity>

          {/* Texto de escolha da forma de pagamento */}
          <Text style={styles.choosePaymentText}>Escolha a forma de pagamento</Text>

          {/* Opções de pagamento */}
          <View style={styles.radioGroupContainer}>
            {/* Dinheiro */}
            <TouchableOpacity
              style={[styles.radioOption, selectedPaymentMethod === "dinheiro" && styles.selectedPaymentOption]}
              onPress={() => setSelectedPaymentMethod("dinheiro")}
            >
              <Icon
                name="attach-money"
                size={24}
                color={selectedPaymentMethod === "dinheiro" ? "#FF4500" : "#000"}
              />
              <Text style={styles.radioOptionText}>Dinheiro</Text>
            </TouchableOpacity>

            {/* Cartão */}
            <TouchableOpacity
              style={[styles.radioOption, selectedPaymentMethod === "cartao" && styles.selectedPaymentOption]}
              onPress={() => setSelectedPaymentMethod("cartao")}
            >
              <Icon
                name="credit-card"
                size={24}
                color={selectedPaymentMethod === "cartao" ? "#FF4500" : "#000"}
              />
              <Text style={styles.radioOptionText}>Cartão</Text>
            </TouchableOpacity>

            {/* Pix */}
            <TouchableOpacity
              style={[styles.radioOption, selectedPaymentMethod === "pix" && styles.selectedPaymentOption]}
              onPress={() => setSelectedPaymentMethod("pix")}
            >
              <Icon
                name="account-balance-wallet"
                size={24}
                color={selectedPaymentMethod === "pix" ? "#FF4500" : "#000"}
              />
              <Text style={styles.radioOptionText}>Pix</Text>
            </TouchableOpacity>
          </View>

          {/* Seção de Adicionais */}
          <Text style={styles.choosePaymentText}>Adicionais</Text>

          {/* Renderizando os adicionais */}
          {additionals.map((additional) => (
            <AdditionalOption
              key={additional.idAdditional}
              title={additional.description}
              price={additional.price}
              checked={selectedAdditionals[additional.idAdditional] || false}
              onPress={() => handleAdditionalSelection(additional.idAdditional)}
            />
          ))}

          {/* Seção de Itens do Pedido */}
          <View style={styles.orderItemsSection}>
            <Text style={styles.orderItemsTitle}>Resumo do pedido</Text>
            {/* Exibindo os itens do pedido */}
            {orderItems.map((item) => (
              <OrderItemCard
                key={item.id}
                description={item.description}
                quantity={item.quantity}
                price={item.price}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal de Endereço */}
      <AddressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectAddress={(address) => {
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