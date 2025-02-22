import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import HotelCard from "./HotelCard";

export default function HotelList({ hotelList }) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        🏨 Hotel Recommendation
      </Text>
      <FlatList
        data={hotelList}
        style={{
          marginTop: 20,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <HotelCard item={item} />}
      />
    </View>
  );
}
