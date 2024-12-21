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