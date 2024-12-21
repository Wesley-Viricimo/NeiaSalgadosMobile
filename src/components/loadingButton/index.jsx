// Component: LoadingButton
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, StyleSheet } from 'react-native';
import { styles } from './styles';

export default function LoadingButton({ isLoading, onPress, text }) {
    return (
        <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={onPress}
            disabled={isLoading}
        >
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#ffffff" style={styles.loadingDots} />
                </View>
            ) : (
                <Text style={styles.buttonText}>{text}</Text>
            )}
        </TouchableOpacity>
    );
}

// LoadingButton Styles
export const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1e90ff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    disabledButton: {
        backgroundColor: '#87ceeb',
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
    loadingDots: {
        marginHorizontal: 5,
    },
});