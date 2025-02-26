import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View>
      <Image
        source={require("../assets/images/login.jpg")}
        style={{
          width: "100%",
          height: 400,
        }}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 28,
            fontFamily: "outfit-bold",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
            color: Colors.ICON_DARK,
          }}
        >
          EaseMyJourney
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 17,
            textAlign: "center",
            color: "#7d7d7d",
            marginTop: 20,
          }}
        >
          Discover your next adventure effortlessly. Personalized itineraries at
          your fingertips. Travel smarter with AI-driven insights.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("auth/signin")}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 17,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    height: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: "15%",
  },
});
