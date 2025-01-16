import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { StyleSheet } from 'react-native';

interface LoadingButtonProps {
    isLoading: boolean;
    onPress: () => void;
    text: string;
}

export default function LoadingButton({ isLoading, onPress, text }: LoadingButtonProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            disabled={isLoading}
        >
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    {/* Circular Progress */}
                    <ActivityIndicator 
                        color="#ffffff" 
                        size="small" // Você pode ajustar o tamanho do círculo aqui
                    />
                </View>
            ) : (
                <Text style={styles.buttonText}>{text}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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