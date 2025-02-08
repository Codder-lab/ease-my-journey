import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { Colors } from "../../constants/Colors";
import { Image } from "expo-image";
import { CreateTripContext } from "../../context/create_trip_context";
import { AI_PROMPT } from "../../constants/Options";

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  useEffect(() => {
    tripData && GenerateAiTrip();
  }, [tripData]);

  const GenerateAiTrip = () => {
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.locationInfo?.name
    )
      .replace("{totalDays}", tripData?.totalNoOfDays)
      .replace("{totalNight}", tripData?.totalNoOfDays - 1)
      .replace("{traveller}", tripData?.traveller?.title)
      .replace("{budget}", tripData?.budget)
      .replace("{totalDays}", tripData?.totalNoOfDays)
      .replace("{totalNight}", tripData?.totalNoOfDays - 1);

    console.log(FINAL_PROMPT);
  };

  return (
    <View
      style={{
        padding: 25,
        padddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          textAlign: "center",
        }}
      >
        Please Wait...
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        We are working to generate your dream trip.
      </Text>
      <Image
        source={require("../../assets/images/car.gif")}
        style={{ width: "100%", height: 200 }}
        contentFit="contain"
      />

      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Do not Go Back
      </Text>
    </View>
  );
}
