import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { Image } from "expo-image";
import { CreateTripContext } from "../../context/create_trip_context";
import { AI_PROMPT } from "../../constants/Options";
import { chatSession } from "../../configs/AiModel";
import { useRouter } from "expo-router";
import { auth, db } from "../../configs/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    GenerateAiTrip();
  }, []);

  const GenerateAiTrip = async () => {
    setLoading(true);
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

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResponse = JSON.parse(result.response.text());

    setLoading(false);

    const docId = Date.now().toString();
    const _result = await setDoc(doc(db, "UserTrips", docId), {
      userEmail: user.email,
      tripPlan: tripResponse, // AI Result
      tripData: JSON.stringify(tripData), // User Selection Data
      docId: docId,
    });

    router.push("(tabs)/Trips");
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
          color: "#7d7d7d",
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Do not Go Back
      </Text>
    </View>
  );
}
