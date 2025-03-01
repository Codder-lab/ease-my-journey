import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
  LogBox,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
  PhoneAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../../configs/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

// Suppress the specific warning
LogBox.ignoreLogs([
  "FirebaseRecaptcha: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
]);

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const sendOTP = async () => {
    if (phoneNumber.length !== 10) {
      ToastAndroid.show("Enter a valid phone number", ToastAndroid.LONG);
      return;
    }

    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+91${phoneNumber}`,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      ToastAndroid.show("OTP Sent!", ToastAndroid.LONG);
    } catch (error) {
      ToastAndroid.show("Failed to send OTP", ToastAndroid.LONG);
      console.error(error);
    }
  };

  const OnCreateAccount = async () => {
    if (!email.trim() || !password.trim() || !fullName.trim() || !phoneNumber.trim()) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.LONG);
      return;
    }

    if (!verificationId || !otp) {
      ToastAndroid.show("Please verify your phone number", ToastAndroid.LONG);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with full name
      await updateProfile(user, { displayName: fullName });

      // Verify and link phone number
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await updatePhoneNumber(user, credential);

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
      });

      // Navigate to the home screen
      router.replace("/Trips");
      console.log("User Created:", user);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true}
      />

      <Text style={styles.title}>Create New Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={Colors.ICON_DARK}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.ICON_DARK}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={Colors.ICON_DARK}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
        <TouchableOpacity onPress={sendOTP}>
          <Text style={{ color: Colors.PRIMARY }}>Send OTP</Text>
        </TouchableOpacity>
      </View>

      {verificationId && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor={Colors.ICON_DARK}
            keyboardType="numeric"
            onChangeText={setOtp}
          />
        </View>
      )}

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

      <TouchableOpacity style={styles.signInBtn} onPress={OnCreateAccount}>
        <Text style={styles.signInText}>Create Account</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
        <Text style={styles.signUpText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("auth/signin")}>
          <Text style={{ color: Colors.PRIMARY }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.ICON_DARKER,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "outfit",
    textAlign: "center",
    color: Colors.ICON_DARK,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 13,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    fontFamily: "outfit",
    fontSize: 12,
    color: Colors.ICON_DARKER,
  },
  signInBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 18,
    borderRadius: 13,
    alignItems: "center",
  },
  signInText: {
    fontSize: 15,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  signUpText: {
    fontFamily: "outfit",
    color: Colors.ICON_DARK,
  },
});