import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View
      style={{
        padding: 25,
        paddingTop: 50,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Create New Account
      </Text>

      {/* User Full Name */}
      <View
        style={{
          marginTop: 50,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            color: "#7d7d7d",
          }}
        >
          Full Name
        </Text>
        <TextInput style={styles.input} placeholder="Enter your Full Name" />
      </View>

      {/* Email */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            color: "#7d7d7d",
          }}
        >
          Email
        </Text>
        <TextInput style={styles.input} placeholder="Enter Email" />
      </View>

      {/* Password */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            color: "#7d7d7d",
          }}
        >
          Password
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
        />
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={() => router.replace("auth/signin")}
        style={{
          padding: 20,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginTop: 20,
          borderWidth: 1,
        }}
      >
        <Text
          style={{
            color: Colors.PRIMARY,
            textAlign: "center",
          }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
});