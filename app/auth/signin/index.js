import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../../configs/FirebaseConfig";
import { width, height } from "../../../constants/Dimensions";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Signin Logic
  const OnSignIn = () => {
    if (!email.trim() || !password.trim()) {
      ToastAndroid.show("Please Enter Email & Password", ToastAndroid.LONG);
      return;
    }
    // Signin using email and password 
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          router.replace("/Trips");
          console.log("User Login Successful: ", user.uid);
          console.log(user);
        } else {
          // Email Verification Logic
          sendEmailVerification(user)
            .then(() => {
              ToastAndroid.show(
                "Email not verified. Verification email sent.",
                ToastAndroid.LONG
              );
              auth.signOut().then(() => {
                ToastAndroid.show(
                  "Please verify your email to continue.",
                  ToastAndroid.LONG
                );
              });
            })
            .catch((error) => {
              console.log("Verification Email Error:", error);
              ToastAndroid.show(
                "Failed to send verification email.",
                ToastAndroid.LONG
              );
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message, errorCode);
        if (
          errorCode === "auth/invalid-email" ||
          errorCode === "auth/invalid-credential"
        ) {
          ToastAndroid.show("Invalid Credentials", ToastAndroid.LONG);
        }
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.ICON_DARK}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.ICON_DARK}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color={Colors.ICON_DARK}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("auth/forgotpassword")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInBtn} onPress={OnSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.phoneSignInBtn}
        onPress={() => router.push("auth/loginWithPhoneNumber")}
      >
        <Text style={styles.phoneSignInText}>Login with Phone Number</Text>
      </TouchableOpacity> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: width * 0.05,
        }}
      >
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("auth/signup")}>
          <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit" }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: width * 0.1,
    justifyContent: "center",
  },
  title: {
    fontSize: width * 0.1,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.ICON_DARKER,
    marginBottom: width * 0.03,
    //marginBottom: 10,
  },
  subtitle: {
    fontSize: width * 0.05,
    fontFamily: "outfit",
    textAlign: "center",
    color: Colors.ICON_DARK,
    marginBottom: width * 0.1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: width * 0.05,
    padding: width * 0.03,
    marginBottom: width * 0.05,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    fontFamily: "outfit",
    fontSize: width * 0.035,
    color: Colors.ICON_DARKER,
  },
  forgotText: {
    fontSize: width * 0.035,
    fontFamily: "outfit",
    textAlign: "right",
    color: Colors.ICON_DARKER,
    marginBottom: width * 0.07,
    marginTop: -10,
  },
  signInBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: width * 0.05,
    borderRadius: width * 0.05,
    alignItems: "center",
    marginBottom: width * 0.05,
  },
  signInText: {
    fontSize: width * 0.04,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  phoneSignInBtn: {
    backgroundColor: Colors.WHITE,
    padding: width * 0.05,
    borderColor: Colors.ICON_DARKER,
    borderWidth: width * 0.003,
    borderRadius: width * 0.05,
    alignItems: "center",
  },
  phoneSignInText: {
    fontSize: width * 0.04,
    fontFamily: "outfit-bold",
    color: Colors.ICON_DARKER,
  },
  signUpText: {
    fontFamily: "outfit",
    color: Colors.ICON_DARK,
  },
});
