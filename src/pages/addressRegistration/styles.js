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
    marginBottom: 20
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
    fontSize: 14,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: colors.placeholder,
    marginBottom: 4,
    fontFamily: 'Roboto-Regular',
  },
  cancelText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});