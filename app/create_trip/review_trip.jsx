import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/create_trip_context";
import moment from "moment";
import { StyleSheet } from "react-native";
import { width, height } from "../../constants/Dimensions";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        Review your trip
      </Text>
      <View
        style={{
          marginTop: width * .05,
        }}
      >
        <Text
          style={styles.subtitle}
        >
          Before generating your trip, please review your selection
        </Text>

        {/* Destination Info */}
        <View
          style={styles.desContainer}
        >
          <Text
            style={{
              fontSize: width * .07,
            }}
          >
            📍
          </Text>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={styles.infoTitle}
            >
              Destination
            </Text>
            <Text
              style={styles.infoSubtitle}
            >
              {tripData?.locationInfo?.name}
            </Text>
          </View>
        </View>

        {/* Selected Date Info */}
        <View
          style={styles.desContainer}
        >
          <Text
            style={{
              fontSize: width * .07,
            }}
          >
            📅
          </Text>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={styles.infoTitle}
            >
              Travel Date
            </Text>
            <Text
              style={styles.infoSubtitle}
            >
              {moment(tripData?.startDate).format("MMM DD, YYYY") +
                "  to " +
                moment(tripData?.endDate).format("MMM DD, YYYY") +
                " "}
              ({tripData?.totalNoOfDays} days)
            </Text>
          </View>
        </View>

        {/* Traveller Info */}
        <View
          style={styles.desContainer}
        >
          <Text
            style={{
              fontSize: width * .07,
            }}
          >
            🚌
          </Text>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={styles.infoTitle}
            >
              Who is Travelling?
            </Text>
            <Text
              style={styles.infoSubtitle}
            >
              {tripData?.traveller?.title}
            </Text>
          </View>
        </View>

        {/* Budget Info */}
        <View
          style={styles.desContainer}
        >
          <Text
            style={{
              fontSize: width * .07,
            }}
          >
            💰
          </Text>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={styles.infoTitle}
            >
              Budget
            </Text>
            <Text
              style={styles.infoSubtitle}
            >
              {tripData?.budget}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace("/create_trip/generate_trip")}
      >
        <Text
          style={styles.btnText}
        >
          Build my trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * .05,
    paddingTop: width * .1,
    backgroundColor: Colors.WHITE,
    height: height * 1.5,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: width * .08,
    marginTop: width * .05,
    color: Colors.ICON_DARKER,
  },
  subtitle: {
    fontFamily: "outfit-bold",
    fontSize: width * .05,
    color: Colors.ICON_DARK,
  },
  desContainer: {
    marginTop: width * .05,
    display: "flex",
    flexDirection: "row",
    gap: width * .05,
  },
  infoTitle: {
    fontFamily: "outfit-medium",
    fontSize: width * .05,
    color: "#7d7d7d",
  },
  infoSubtitle: {
    fontFamily: "outfit",
    fontSize: width * .05,
    flexWrap: "wrap",
  },
  btn: {
    padding: width * .04,
    backgroundColor: Colors.PRIMARY,
    borderRadius: width * .04,
    marginTop: width * .1,
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: width * .05,
  }
});