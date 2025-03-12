import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { width, height } from "../../../constants/Dimensions";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    if (!email.trim()) {
      ToastAndroid.show("Please enter your email", ToastAndroid.LONG);
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        ToastAndroid.show("Password reset email sent!", ToastAndroid.LONG);
        router.replace("auth/signin");
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show("Error sending reset email", ToastAndroid.LONG);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.ICON_DARKER} />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Enter your email to reset your password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={Colors.ICON_DARK}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      <TouchableOpacity style={styles.signInBtn} onPress={handlePasswordReset}>
        <Text style={styles.signInText}>Send Reset Email</Text>
      </TouchableOpacity>

      {/* <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
        <Text style={styles.signUpText}>Remember your password? </Text>
        <TouchableOpacity onPress={() => router.replace("auth/signin")}>
          <Text style={{ color: Colors.PRIMARY }}>Sign In</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: width * .1,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: width * .1,
    left: width * .05,
    zIndex: 10,
  },
  title: {
    fontSize: width * .09,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.ICON_DARKER,
    marginBottom: width * .02,
  },
  subtitle: {
    fontSize: width * .04,
    fontFamily: "outfit",
    textAlign: "center",
    color: Colors.ICON_DARK,
    marginBottom: width * .1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: width * .05,
    padding: width * .03,
    marginBottom: width * .05,
    borderWidth: width * .005,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    fontFamily: "outfit",
    fontSize: width * .035,
    color: Colors.ICON_DARKER,
  },
  signInBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: width * .05,
    borderRadius: width * .05,
    alignItems: "center",
  },
  signInText: {
    fontSize: width * .04,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  signUpText: {
    fontFamily: "outfit",
    color: Colors.ICON_DARK,
  },
});
