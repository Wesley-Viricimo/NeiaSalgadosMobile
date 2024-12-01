import { StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: spacing.large,
  },
  header: {
    fontSize: 25,
    color: colors.primary,
    fontFamily: fonts.bold,
    marginBottom: spacing.large,
    textAlign: 'center'
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.medium,
    marginTop: spacing.large,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.disabled, // Pode ser uma cor mais clara do tema
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  cancelText: {
    color: colors.error,
    fontSize: 16,
    fontFamily: fonts.regular,
    marginTop: spacing.medium,
    textAlign: 'center',
  },
});