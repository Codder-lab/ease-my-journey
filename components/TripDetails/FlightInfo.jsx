import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { width, height } from "../../constants/Dimensions";

export default function FlightInfo({ flightData }) {
  const handleBooking = () => {
    if (flightData?.bookingUrl) {
      Linking.openURL(flightData?.bookingUrl).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    } else {
      console.warn("No booking URL found");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.flightContainer}>
        <Text style={styles.title}>✈️ Flights</Text>

        <TouchableOpacity onPress={handleBooking} style={styles.btn}>
          <Text style={styles.btnText}>Book Here</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>
        Price: ₹ {flightData?.approximatePriceINR} (approx.)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: width * 0.05,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    padding: width * 0.03,
    borderRadius: width * 0.03,
  },
  flightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: width * 0.05,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: width * 0.018,
    width: width * 0.22,
    borderRadius: width * 0.03,
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit",
    fontSize: width * 0.035,
    marginVertical: width * 0.01,
  },
  subtitle: {
    fontFamily: "outfit",
    fontSize: width * 0.04,
    color: "#7d7d7d",
    margin: width * 0.015,
  },
});
