import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { GetPhotoRef, GetHotelRatings, GetGoogleMapsPlaceId } from "../../services/GooglePlaceAPI";
import { Colors } from "../../constants/Colors";

export default function HotelCard({ item }) {
  const [photoRef, setPhotoRef] = useState(null);
  const [hotelRating, setHotelRating] = useState("N/A");
  const [placeId, setPlaceId] = useState(null);

  useEffect(() => {
    FetchHotelData();
  }, []);

  const FetchHotelData = async () => {
    try {
      const [photo, rating, place] = await Promise.all([
        GetPhotoRef(item.hotelName),
        GetHotelRatings(item.hotelName),
        GetGoogleMapsPlaceId(item.hotelName),
      ]);

      // Extract photo reference if available
      setPhotoRef(photo?.results?.[0]?.photos?.[0]?.photo_reference || null);
      setHotelRating(rating);
      setPlaceId(place);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  const OpenGoogleMaps = () => {
    const url = placeId
      ? `https://www.google.com/maps/search/?api=1&query=place_id:${placeId}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.hotelName)}`;

    Linking.openURL(url).catch((err) => console.error("Failed to open Google Maps:", err));
  };

  return (
    <TouchableOpacity onPress={OpenGoogleMaps} activeOpacity={0.7}>
      <View style={{ marginRight: 20, width: 180 }}>
        {photoRef ? (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            style={{ width: 180, height: 120, borderRadius: 15 }}
          />
        ) : (
          <View
            style={{
              width: 180,
              height: 120,
              borderRadius: 15,
              backgroundColor: "#e0e0e0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Loading...</Text>
          </View>
        )}

        <View style={{ padding: 5 }}>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>{item.hotelName}</Text>

          <Text style={{ fontFamily: "outfit", color: "#7d7d7d" }}>
            ₹ {item.pricePerNightINR}/night (approx.)
          </Text>

          <Text style={{ fontFamily: "outfit", color: Colors.PRIMARY }}>
            Ratings: ⭐{hotelRating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
