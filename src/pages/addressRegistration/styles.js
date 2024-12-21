import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainerStacing: {
    marginBottom: 20,
    marginTop: 10
  },
  rowContainerStacing: {
    marginBottom: 20,
    marginTop: 10
  },
  halfWidthInputContainer: {
    flex: 0.70,  // Rua ocupa 70% da largura
  },
  narrowInputContainer: {
    flex: 0.30,  // Número ocupa 30% da largura
    marginRight: 10,
  },
  halfWidthInputContainerCep: {
    flex: 0.30,  // CEP ocupa 30% da largura
    marginRight: 10,
  },
  narrowInputContainerState: {
    flex: 0.70,  // Estado ocupa 70% da largura
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.placeholder,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.small,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: colors.placeholder,
    marginBottom: 4,
    fontFamily: 'Roboto-Regular',
  },
  cancelText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    position: 'absolute',  // Coloca o loader sobre outros componentes
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,  // Preenche toda a tela
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,  // Garantir que o indicador de progresso fique sobre outros componentes
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});