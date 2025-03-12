import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { width, height } from "../constants/Dimensions";

export default function Login() {
  const router = useRouter();

  return (
    <View>
      <Image
        source={require("../assets/images/login.jpg")}
        style={{
          width: width * 1,
          height: height * 0.5,
        }}
      />
      <View style={styles.container}>
        <Text
          style={styles.title}
        >
          EaseMyJourney
        </Text>
        <Text
          style={styles.subtitle}
        >
          Discover your next adventure effortlessly. Personalized itineraries at
          your fingertips. Travel smarter with AI-driven insights.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("auth/signin")}
        >
          <Text
            style={styles.btnText}
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
    height: height * 1.5,
    borderTopLeftRadius: width * .065,
    borderTopRightRadius: width * .065,
    padding: width * .08,
  },
  title: {
    fontSize: width * .08,
    fontFamily: "outfit-bold",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: width * .05,
    color: Colors.ICON_DARK,
  },
  subtitle: {
    fontFamily: "outfit",
    fontSize: width * .05,
    textAlign: "center",
    color: "#7d7d7d",
    marginTop: width * .05,
  },
  button: {
    padding: width * .04,
    backgroundColor: Colors.PRIMARY,
    borderRadius: width * .1,
    marginTop: width * .1,
  },
  btnText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 17,
  }
});
