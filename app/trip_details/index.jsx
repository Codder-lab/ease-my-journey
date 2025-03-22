import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import DailyItinerary from "../../components/TripDetails/DailyItinerary";
import BudgetSummary from "../../components/TripDetails/BudgetSummary";
import { width, height } from "../../constants/Dimensions";

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState([]);
  const formatData = (data) => {
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("JSON Parse Error:", error);
        return {};
      }
    }
    return data || {};
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      headerTintColor: Colors.WHITE,
    });

    setTripDetails(JSON.parse(trip));
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
            formatData(tripDetails?.tripData).locationInfo?.photoRef +
            "&key=" +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={styles.imageContainer}
      />
      <View style={styles.container}>
        <Text style={styles.location}>
          {tripDetails?.tripPlan?.tripDetails?.location}
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.date}>
            {moment(formatData(tripDetails.tripData).startDate).format(
              "DD MMM YYYY"
            )}
          </Text>
          <Text style={styles.date}>
            -{" "}
            {moment(formatData(tripDetails.tripData).endDate).format(
              "DD MMM YYYY"
            )}
          </Text>
        </View>
        <Text style={styles.title}>
          {formatData(tripDetails.tripData)?.traveller?.icon}{" "}
          {formatData(tripDetails.tripData)?.traveller?.title}
        </Text>

        {/* Budget Summary */}
        <BudgetSummary budgetSummary={tripDetails?.tripPlan?.budgetSummary} />

        {/* Flight Information */}
        <FlightInfo flightData={tripDetails?.tripPlan?.flightDetails} />

        {/* Hotels Information */}
        <HotelList hotelList={tripDetails?.tripPlan?.hotelOptions} />

        {/* Trip Day Planner Information */}
        <DailyItinerary
          dailyItinerary={tripDetails?.tripPlan?.dailyItinerary}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: width * 1,
    height: height * 0.4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  container: {
    padding: width * 0.05,
    backgroundColor: Colors.WHITE,
    height: "100%",
    marginTop: -30,
    borderTopLeftRadius: width * 0.065,
    borderTopRightRadius: width * 0.065,
  },
  location: {
    fontFamily: "outfit-bold",
    fontSize: width * 0.06,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: width * 0.01,
    marginTop: width * 0.01,
  },
  date: {
    fontFamily: "outfit",
    fontSize: width * 0.043,
    color: "#7d7d7d",
  },
  title: {
    fontFamily: "outfit",
    fontSize: width * 0.043,
    marginTop: width * 0.015,
    color: "#7d7d7d",
  },
});
