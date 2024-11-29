import React from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Importa a biblioteca de animações
import { styles } from './styles';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {/* Pontinho 1 */}
        <Animatable.Text
          style={styles.dot}
          animation="bounce"
          iterationCount="infinite"
          delay={0}
        >
          ●
        </Animatable.Text>
        {/* Pontinho 2 */}
        <Animatable.Text
          style={styles.dot}
          animation="bounce"
          iterationCount="infinite"
          delay={200} // Atraso para criar sequência
        >
          ●
        </Animatable.Text>
        {/* Pontinho 3 */}
        <Animatable.Text
          style={styles.dot}
          animation="bounce"
          iterationCount="infinite"
          delay={400}
        >
          ●
        </Animatable.Text>
      </View>
    </View>
  );
};

export default LoadingIndicator;