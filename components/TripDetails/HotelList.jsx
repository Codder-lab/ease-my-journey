import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

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
        renderItem={({ item, index }) => (
          <View
            style={{
              marginRight: 20,
              width: 180,
            }}
          >
            <Image
              source={require("../../assets/images/login.jpg")}
              style={{
                width: 180,
                height: 120,
                borderRadius: 15,
              }}
            />
            <View
              style={{
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 17,
                }}
              >
                {item.hotelName}
              </Text>

              <View>
                <Text
                  style={{
                    fontFamily: "outfit",
                    color: "#7d7d7d",
                  }}
                >
                  ₹ {item.pricePerNightINR}/night (approx.)
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
