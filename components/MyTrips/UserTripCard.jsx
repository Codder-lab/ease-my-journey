import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import { useRouter } from "expo-router";
import { width, height } from "../../constants/Dimensions";

export default function UserTripCard({ trip }) {
  const formatData = (data) => {
    return JSON.parse(data);
  };
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/trip_details",
          params: {
            trip: JSON.stringify(trip),
          },
        });
      }}
      style={styles.tripContainer}
    >
      <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            formatData(trip.tripData).locationInfo?.photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={styles.imgContainer}
      />
      <View style={styles.tripDetailContainer}>
        <Text
          style={styles.location}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {trip.tripPlan?.tripDetails?.location}
        </Text>
        <Text style={styles.date}>
          {moment(formatData(trip.tripData).startDate).format("DD MMM YYYY")} -{" "}
          {moment(formatData(trip.tripData).endDate).format("DD MMM YYYY")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tripContainer: {
    marginTop: width * 0.05,
    display: "flex",
    flexDirection: "row",
    gap: width * 0.04,
    alignItems: "center",
  },
  imgContainer: {
    width: width * 0.25,
    height: height * 0.11,
    borderRadius: width * 0.03,
  },
  tripDetailContainer: {
    flex: 1,
    marginRight: width * 0.05,
  },
  location: {
    fontFamily: "outfit-medium",
    fontSize: width * 0.038,
    flexShrink: 1,
  },
  date: {
    fontFamily: "outfit",
    fontSize: width * 0.033,
    color: "#7d7d7d",
  },
});
