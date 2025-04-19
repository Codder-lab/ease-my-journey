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
  //updatePhoneNumber,
  //PhoneAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../../configs/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
//import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
//import LottieView from "lottie-react-native";
import { width, height } from "../../../constants/Dimensions";

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
  //const [phoneNumber, setPhoneNumber] = useState("");
  //const [otp, setOtp] = useState("");
  //const [verificationId, setVerificationId] = useState(null);
  //const [isOtpSent, setIsOtpSent] = useState(false);
  //const [timer, setTimer] = useState(0);
  //const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  //const recaptchaVerifier = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Start Resend OTP timer
  // const startTimer = () => {
  //   setTimer(60);
  //   setIsOtpSent(true);

  //   const interval = setInterval(() => {
  //     setTimer((prev) => {
  //       if (prev === 1) {
  //         clearInterval(interval);
  //         setIsOtpSent(false);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  // };

  // // Send otp logic
  // const sendOTP = async () => {
  //   if (phoneNumber.length !== 10) {
  //     ToastAndroid.show("Enter a valid phone number", ToastAndroid.LONG);
  //     return;
  //   }

  //   const phoneProvider = new PhoneAuthProvider(auth);
  //   try {
  //     const verificationId = await phoneProvider.verifyPhoneNumber(
  //       `+91${phoneNumber}`,
  //       recaptchaVerifier.current
  //     );
  //     setVerificationId(verificationId);
  //     ToastAndroid.show("OTP Sent!", ToastAndroid.LONG);
  //     startTimer(); // Start cooldown timer
  //   } catch (error) {
  //     ToastAndroid.show("Failed to send OTP", ToastAndroid.LONG);
  //     console.error(error);
  //   }
  // };

  // // Verify otp logic
  // const verifyOTP = async () => {
  //   if (!verificationId || !otp) {
  //     ToastAndroid.show("Please enter OTP", ToastAndroid.LONG);
  //     return;
  //   }
  //   try {
  //     const credential = PhoneAuthProvider.credential(verificationId, otp);
  //     ToastAndroid.show("OTP Verified!", ToastAndroid.LONG);

  //     // Show success animation
  //     setShowSuccessAnimation(true);
  //   } catch (error) {
  //     ToastAndroid.show("Invalid OTP", ToastAndroid.LONG);
  //     console.error("Error verifying OTP:", error);
  //   }
  // };

  // Account creation logic
  const OnCreateAccount = async () => {
    if (
      !email.trim() ||
      !password.trim() ||
      !fullName.trim() //||
      //!phoneNumber.trim()
    ) {
      ToastAndroid.show("Please fill all fields", ToastAndroid.LONG);
      return;
    }

    // if (!verificationId || !otp) {
    //   ToastAndroid.show("Please verify your phone number", ToastAndroid.LONG);
    //   return;
    // }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with full name
      await updateProfile(user, { displayName: fullName });

      // Verify and link phone number
      // const credential = PhoneAuthProvider.credential(verificationId, otp);
      // await updatePhoneNumber(user, credential);

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: email,
        //phoneNumber: phoneNumber,
        createdAt: new Date(),
      });

      // Navigate to the home screen
      router.replace("/Trips");
      console.log("User Created Successfully:", user);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("auth/signin")}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color={Colors.ICON_DARKER} />
      </TouchableOpacity>

      {/* <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true}
      /> */}

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

      {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={Colors.ICON_DARK}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
        {/* Show "Send OTP" button only if OTP is not sent */}
        {/* {!isOtpSent && (
          <TouchableOpacity onPress={sendOTP}>
            <Text style={styles.sendOtp}>Send OTP</Text>
          </TouchableOpacity>
        )}
      </View> */}

      {/* Show "Resend OTP" button only if OTP is sent */}
      {/* {isOtpSent && (
        <TouchableOpacity
          onPress={sendOTP}
          disabled={timer > 0}
          style={styles.resendButton}
        >
          <Text style={styles.resendText}>
            {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
          </Text>
        </TouchableOpacity>
      )}

      {verificationId && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor={Colors.ICON_DARK}
            keyboardType="numeric"
            onChangeText={setOtp}
          />
          {/* Show Verify button or Success Animation */}
          {/* {!showSuccessAnimation ? (
            <TouchableOpacity onPress={verifyOTP}>
              <Text style={styles.verify}>Verify</Text>
            </TouchableOpacity>
          ) : (
            <LottieView
              source={require("../../../assets/images/success.json")}
              autoPlay
              loop={false}
              style={styles.success} // Adjust size as needed
            />
          )}
        </View>
      )} */}

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

      <View style={styles.alreadyContainer}>
        <Text style={styles.signUpText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("auth/signin")}>
          <Text style={styles.alreadySignInText}>Sign In</Text>
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
  backButton: {
    position: "absolute",
    top: width * 0.1,
    left: width * 0.05,
    zIndex: 10,
  },
  title: {
    fontSize: width * 0.1,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.ICON_DARKER,
    marginBottom: width * 0.03,
  },
  subtitle: {
    fontSize: width * 0.04,
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
    borderWidth: width * 0.003,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    fontFamily: "outfit",
    fontSize: width * 0.035,
    color: Colors.ICON_DARKER,
  },
  sendOtp: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
    fontSize: width * 0.035,
  },
  resendButton: {
    alignSelf: "flex-end",
    marginTop: -15,
    marginBottom: width * 0.05,
  },
  // resendText: {
  //   color: timer > 0 ? Colors.ICON_DARK : Colors.PRIMARY,
  //   fontFamily: "outfit",
  // },
  verify: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
  },
  success: {
    width: 30,
    height: 30,
  },
  signInBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: width * 0.05,
    borderRadius: width * 0.05,
    alignItems: "center",
  },
  signInText: {
    fontSize: width * 0.04,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  signUpText: {
    fontFamily: "outfit",
    color: Colors.ICON_DARK,
  },
  alreadyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: width * 0.05,
  },
  alreadySignInText: {
    color: Colors.PRIMARY,
    fontFamily: "outfit",
  },
});
