import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../global/styles';

export const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.medium,
  },
  label: {
    fontSize: 16,
    color: colors.placeholder,
    marginBottom: 4,
    fontFamily: 'Roboto-Regular',
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
  icon: {
    marginRight: spacing.small,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontFamily: 'Roboto-Regular',
  },
  eyeIcon: {
    padding: spacing.small,
  },
});