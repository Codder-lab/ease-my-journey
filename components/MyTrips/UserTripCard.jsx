import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { useRouter } from "expo-router";

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
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            formatData(trip.tripData).locationInfo?.photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />
      <View style={{ flex: 1, marginRight: 10 }}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 16,
            flexShrink: 1, // Prevents overflow and allows shrinking
          }}
          numberOfLines={1} // Keeps text to a single line and truncates with "..."
          ellipsizeMode="tail" // Adds "..." at the end if text overflows
        >
          {trip.tripPlan?.tripDetails?.location}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 12,
            color: "#7d7d7d",
          }}
        >
          {moment(formatData(trip.tripData).startDate).format("DD MMM YYYY")} - {moment(formatData(trip.tripData).endDate).format("DD MMM YYYY")}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
