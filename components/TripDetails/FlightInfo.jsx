import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function FlightInfo({ flightData }) {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          ✈️ Flights
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 10,
            width: 100,
            borderRadius: 7,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.WHITE,
              fontFamily: "outfit",
            }}
          >
            Book Here
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 17,
          color: "#7d7d7d",
          margin: 5,
        }}
      >
        Price: ₹ {flightData?.approximatePriceINR} (approx)
      </Text>
    </View>
  );
}
