import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1e90ff',
        paddingVertical: 13,
        paddingHorizontal: 20, // Largura do botão com padding fixo
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
        minWidth: 150, // Largura mínima para garantir que o botão não mude de tamanho
        justifyContent: 'center',  // Alinha os itens verticalmente no centro
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});