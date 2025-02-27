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

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    if (!email) {
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
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email to reset your password
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={(value) => setEmail(value)}
        value={email}
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 60,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    marginBottom: 10,
    color: Colors.ICON_DARKER,
  },
  subtitle: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.ICON_DARK,
    marginBottom: 30,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
    marginBottom: 20,
  },
  button: {
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
  backText: {
    color: Colors.PRIMARY,
    textAlign: "center",
  },
  backButton: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
  },
});
