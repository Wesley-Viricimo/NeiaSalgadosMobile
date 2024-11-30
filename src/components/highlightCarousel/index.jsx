import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { styles } from "./styles";

const { width } = Dimensions.get("window");

const data = [
  { title: "Promoção 1", image: "https://via.placeholder.com/150" },
  { title: "Promoção 2", image: "https://via.placeholder.com/150" },
  { title: "Promoção 3", image: "https://via.placeholder.com/150" },
];

const HighlightCarousel = () => {
  return (
    <Carousel
      loop
      width={width}
      height={200}
      autoPlay
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
};



export default HighlightCarousel;