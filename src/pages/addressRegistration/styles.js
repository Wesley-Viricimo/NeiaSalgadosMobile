import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidthInput: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: '#FF4500',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#FF4500',
    fontSize: 16,
  },
});