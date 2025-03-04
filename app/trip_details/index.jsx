import { View, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import DailyItinerary from "../../components/TripDetails/DailyItinerary";
import BudgetSummary from "../../components/TripDetails/BudgetSummary";

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
        style={{
          width: "100%",
          height: 300,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      />
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.WHITE,
          height: "100%",
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          {tripDetails?.tripPlan?.tripDetails?.location}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: "#7d7d7d",
            }}
          >
            {moment(formatData(tripDetails.tripData).startDate).format(
              "DD MMM YYYY"
            )}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: "#7d7d7d",
            }}
          >
            -{" "}
            {moment(formatData(tripDetails.tripData).endDate).format(
              "DD MMM YYYY"
            )}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 17,
            marginTop: 5,
            color: "#7d7d7d",
          }}
        >
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
