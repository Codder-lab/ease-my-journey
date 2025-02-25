import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef } from "../../services/GooglePlaceAPI";

export default function HotelCard({ item }) {
  const [photoRef, setPhotoRef] = useState();

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    try {
      const result = await GetPhotoRef(item.hotelName);

      // Check if photos array exists
      if (result?.results?.[0]?.photos?.[0]?.photo_reference) {
        const photoRef = result.results[0].photos[0].photo_reference;
        // console.log("Photo Reference:", photoRef); // ✅ Should show the correct photo reference
        setPhotoRef(photoRef);
      } else {
        console.log("No photo reference found");
      }
    } catch (error) {
      console.error("Error fetching photo reference:", error);
    }
  };

  return (
    <View
      style={{
        marginRight: 20,
        width: 180,
      }}
    >
      {photoRef ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
              photoRef +
              "&key=" +
              process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          }}
          style={{
            width: 180,
            height: 120,
            borderRadius: 15,
          }}
        />
      ) : (
        <View
          style={{
            width: 180,
            height: 120,
            borderRadius: 15,
            backgroundColor: "#e0e0e0", // Placeholder background
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Loading...</Text>
        </View>
      )}

      <View
        style={{
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 17,
          }}
        >
          {item.hotelName}
        </Text>

        <View>
          <Text
            style={{
              fontFamily: "outfit",
              color: "#7d7d7d",
            }}
          >
            ₹ {item.pricePerNightINR}/night (approx.)
          </Text>
        </View>
      </View>
    </View>
  );
}
