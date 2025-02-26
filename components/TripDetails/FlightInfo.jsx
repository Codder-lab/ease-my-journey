import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function FlightInfo({ flightData }) {
  const handleBooking = () => {
    if (flightData?.bookingUrl) {
      Linking.openURL(flightData?.bookingUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      console.warn("No booking URL found");
    }
  }
  return (
    <View
      style={{
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY,
        padding: 10,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
        onPress={handleBooking}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 10,
            width: 100,
            borderRadius: 15,
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
        Price: ₹ {flightData?.approximatePriceINR} (approx.)
      </Text>
    </View>
  );
}
