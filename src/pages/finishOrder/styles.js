import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

  // Estilos para o endereço de retirada
  pickupAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  iconContainer: {
    marginRight: 15,
  },
  addressTextContainer: {
    flex: 1,
  },
  pickupTextBold: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  pickupText: {
    fontSize: 14,
    color: "#555",
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
