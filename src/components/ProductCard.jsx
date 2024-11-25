import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const ProductCard = ({ product }) => {
  // Validação para garantir que os dados são do tipo correto
  const { description, price, urlImage } = product;
  console.log('product', product);

  if (!description || !price || !urlImage) {
    return (
      <View style={styles.card}>
        <Text>Dados inválidos do produto.</Text>  {/* Exibe mensagem de erro caso dados sejam inválidos */}
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Exibindo a imagem do produto */}
      <Image source={{ uri: urlImage }} style={styles.image} />
      <View style={styles.info}>
        {/* Exibindo a descrição do produto (título) */}
        <Text style={styles.title}>{description}</Text> {/* Exibe a descrição como título */}
        <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#1E90FF',
  },
});

export default ProductCard;