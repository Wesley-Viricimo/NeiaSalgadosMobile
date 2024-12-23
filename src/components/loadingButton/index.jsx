import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { styles } from './styles';

export default function LoadingButton({ isLoading, onPress, text }) {
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