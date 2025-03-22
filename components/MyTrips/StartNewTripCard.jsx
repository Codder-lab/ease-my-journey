import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { width, height } from "../../constants/Dimensions";

export default function StartNewTripCard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="location-sharp" size={30} color="black" />
      <Text style={styles.title}>No Trips planned yet!</Text>
      <Text style={styles.subtitle}>
        Looks like it's time to plan a new travel experience! Get Started Below.
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/create_trip/search_place")}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Start a New Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * 0.08,
    marginTop: width * 0.1,
    display: "flex",
    alignItems: "center",
    gap: width * 0.04,
  },
  title: {
    fontSize: width * 0.07,
    fontFamily: "outfit-medium",
  },
  subtitle: {
    fontSize: width * 0.05,
    fontFamily: "outfit",
    textAlign: "center",
    color: "#7d7d7d",
  },
  btn: {
    padding: width * 0.04,
    backgroundColor: Colors.PRIMARY,
    borderRadius: width * 0.04,
    paddingHorizontal: width * 0.08,
  },
  btnText: {
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: width * 0.04,
  },
});
