import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DailyItinerary({ dailyItinerary = {} }) {
  if (!dailyItinerary || Object.keys(dailyItinerary).length === 0) {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          🧳 Daily Itinerary
        </Text>
        <Text style={{ fontFamily: "outfit", fontSize: 16, color: "gray" }}>
          No itinerary available.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        🧳 Daily Itinerary
      </Text>
      {Object.entries(dailyItinerary).map(([day, details]) => (
        <View
          key={day}
          style={{
            borderWidth: 1,
            padding: 5,
            borderRadius: 15,
            borderColor: Colors.LIGHT_GRAY,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Day: {day.charAt(0).toUpperCase() + day.slice(1)}
          </Text>
          {details?.activities?.map((place, index) => (
            <View key={index} style={{ marginTop: 10, marginBottom: 10 }}>
              <Text style={{ fontFamily: "outfit-medium", fontSize: 15 }}>
                {place?.activityName}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 13,
                  color: "#7d7d7d",
                }}
              >
                {place?.notes || "No additional notes"}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 13,
                  color: Colors.PRIMARY,
                }}
              >
                Price:{" "}
                <Text style={{ fontFamily: "outfit-bold" }}>
                  ₹ {place?.approximateCostINR ?? "N/A"}
                </Text>{" "}
                (approx.)
              </Text>
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 13,
                  color: Colors.PRIMARY,
                }}
              >
                Travel Time:{" "}
                <Text style={{ fontFamily: "outfit-bold" }}>
                  {place?.travelTimeFromPrevious ?? "N/A"}
                </Text>
              </Text>
            </View>
          ))}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 8,
                borderRadius: 10,
              }}
            >
              <Ionicons name="navigate" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}
