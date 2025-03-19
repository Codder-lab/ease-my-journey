import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { width, height } from "../../constants/Dimensions";

export default function OptionCard({ option, selectedOption }) {
  return (
    <View
      style={[
        styles.container,
        selectedOption?.id == option?.id && { borderWidth: 3 },
      ]}
    >
      <View>
        <Text
          style={styles.title}
        >
          {option.title}
        </Text>
        <Text
          style={styles.desc}
        >
          {option.desc}
        </Text>
      </View>

      <Text
        style={styles.icon}
      >
        {option.icon}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  desc: {
    fontSize: 17,
    fontFamily: "outfit",
    color: "#7d7d7d",
  },
  icon: {
    fontSize: 30,
  }
});