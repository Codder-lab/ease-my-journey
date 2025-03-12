import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "../../../configs/FirebaseConfig";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginWithPhone() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent
  const [timer, setTimer] = useState(0); // State for the cooldown timer
  const router = useRouter();
  const recaptchaVerifier = useRef(null); // UseRef for Recaptcha

  // Function to start the cooldown timer
  const startTimer = () => {
    setTimer(60); // 60 seconds cooldown
    setIsOtpSent(true);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsOtpSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOTP = async () => {
    if (phoneNumber.length < 10) {
      ToastAndroid.show("Enter a valid phone number", ToastAndroid.LONG);
      return;
    }

    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+91${phoneNumber}`,
        recaptchaVerifier.current // Pass the ref correctly
      );

      console.log("Verification ID:", verificationId);
      setVerificationId(verificationId);
      ToastAndroid.show("OTP Sent!", ToastAndroid.LONG);
      startTimer(); // Start the cooldown timer
    } catch (error) {
      console.log("Send OTP Error:", error.message);
      ToastAndroid.show("Failed to send OTP", ToastAndroid.LONG);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      ToastAndroid.show("Please enter OTP", ToastAndroid.LONG);
      return;
    }
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      console.log("User Login successful!!");
      ToastAndroid.show("Login Successful!", ToastAndroid.LONG);
      router.replace("/Trips"); // Navigate to Trips Page
    } catch (error) {
      ToastAndroid.show("Invalid OTP", ToastAndroid.LONG);
      console.log("Verify OTP Error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={Colors.ICON_DARKER} />
      </TouchableOpacity>

      {/* Recaptcha Modal */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true}
      />

      <Text style={styles.title}>Login with Phone Number</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={Colors.ICON_DARK}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Show "Send OTP" button only if OTP is not sent */}
      {!isOtpSent && (
        <TouchableOpacity style={styles.sendOtpBtn} onPress={sendOTP}>
          <Text style={styles.btnText}>Send OTP</Text>
        </TouchableOpacity>
      )}

      {/* Show "Resend OTP" button only if OTP is sent */}
      {isOtpSent && (
        <TouchableOpacity
          style={styles.resendButton}
          onPress={sendOTP}
          disabled={timer > 0}
        >
          <Text style={{ color: timer > 0 ? Colors.ICON_DARK : Colors.PRIMARY, fontFamily: "outfit" }}>
            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      )}

      {verificationId && (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor={Colors.ICON_DARK}
              keyboardType="numeric"
              onChangeText={setOtp}
            />
          </View>

          <TouchableOpacity style={styles.verifyOtpBtn} onPress={verifyOTP}>
            <Text style={styles.btnText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
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
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
    color: Colors.ICON_DARKER,
    fontFamily: "outfit-bold",
  },
  inputContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 13,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    fontSize: 14,
    color: Colors.ICON_DARKER,
    fontFamily: "outfit",
  },
  sendOtpBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 18,
    borderRadius: 13,
    alignItems: "center",
    marginBottom: 10,
  },
  verifyOtpBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 18,
    borderRadius: 13,
    alignItems: "center",
  },
  btnText: {
    fontSize: 15,
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
  resendButton: {
    alignSelf: "flex-end",
    marginTop: -10,
    marginBottom: 10,
  },
});