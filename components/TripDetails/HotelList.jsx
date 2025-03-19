import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import HotelCard from "./HotelCard";
import { width, height } from "../../constants/Dimensions";

export default function HotelList({ hotelList }) {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
      >
        🏨 Hotel Recommendation
      </Text>
      <FlatList
        data={hotelList}
        style={styles.hotelList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <HotelCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: width * 0.05,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: width * 0.05,
  },
  hotelList: {
    marginTop: width * 0.05,
  }
});