import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { width, height } from "../../constants/Dimensions";

export default function DailyItinerary({ dailyItinerary = {} }) {
  if (!dailyItinerary || Object.keys(dailyItinerary).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          🧳 Daily Itinerary
        </Text>
        <Text style={styles.subtitle}>
          No itinerary available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🧳 Daily Itinerary
      </Text>
      {Object.entries(dailyItinerary).map(([day, details]) => (
        <View
          key={day}
          style={styles.itineraryContainer}
        >
          <Text
            style={styles.day}
          >
            Day: {day.charAt(0).toUpperCase() + day.slice(1)}
          </Text>
          {details?.activities?.map((place, index) => (
            <View key={index} style={styles.activityContainer}>
              <Text style={styles.activityName}>
                {place?.activityName}
              </Text>
              <Text
                style={styles.additionalNotes}
              >
                {place?.notes || "No additional notes"}
              </Text>
              <Text
                style={styles.priceTitle}
              >
                Price:{" "}
                <Text style={styles.priceTravel}>
                  ₹ {place?.approximateCostINR ?? "N/A"}
                </Text>{" "}
                (approx.)
              </Text>
              <Text
                style={styles.travelTitle}
              >
                Travel Time:{" "}
                <Text style={styles.priceTravel}>
                  {place?.travelTimeFromPrevious ?? "N/A"}
                </Text>
              </Text>
            </View>
          ))}
          {/* <View
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
          </View> */}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: width * .05,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: width * .05,
  },
  subtitle: {
    fontFamily: "outfit",
    fontSize: width * .03,
    color: "gray"
  },
  itineraryContainer: {
    borderWidth: 1,
    padding: width * .03,
    borderRadius: width * .03,
    borderColor: Colors.LIGHT_GRAY,
    marginTop: width * .05,
  },
  day: {
    fontFamily: "outfit-bold",
    fontSize: width * .05,
    marginTop: width * .01,
  },
  activityContainer: {
    marginTop: width * .03,
    marginBottom: width * .01,
  },
  activityName: {
    fontFamily: "outfit-medium",
    fontSize: width * .035,
  },
  additionalNotes: {
    fontFamily: "outfit",
    fontSize: width * .032,
    color: "#7d7d7d",
  },
  priceTitle: {
    fontFamily: "outfit-medium",
    fontSize: width * .032,
    color: Colors.PRIMARY,
  },
  priceTravel: {
    fontFamily: "outfit-bold",
  },
  travelTitle: {
    fontFamily: "outfit",
    fontSize: width * .032,
    color: Colors.PRIMARY,
  }
});