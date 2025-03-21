import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  GetPhotoRef,
  GetHotelRatings,
  GetGoogleMapsPlaceId,
} from "../../services/GooglePlaceAPI";
import { Colors } from "../../constants/Colors";
import { width, height } from "../../constants/Dimensions";

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
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          item.hotelName
        )}`;

    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Google Maps:", err)
    );
  };

  return (
    <TouchableOpacity onPress={OpenGoogleMaps} activeOpacity={0.7}>
      <View style={styles.container}>
        {photoRef ? (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            style={styles.imgContainer}
          />
        ) : (
          <View style={styles.defaultImgContainer}>
            <Text>Loading...</Text>
          </View>
        )}

        <View style={styles.hotelContainer}>
          <Text style={styles.hotelName}>{item.hotelName}</Text>

          <Text style={styles.price}>
            ₹ {item.pricePerNightINR}/night (approx.)
          </Text>

          <Text style={styles.ratings}>Ratings: ⭐{hotelRating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: width * 0.05,
    width: width * 0.43,
  },
  imgContainer: {
    width: width * 0.43,
    height: height * 0.13,
    borderRadius: width * 0.03,
  },
  defaultImgContainer: {
    width: width * 0.43,
    height: height * 0.13,
    borderRadius: width * 0.03,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  hotelContainer: {
    padding: width * 0.015,
  },
  hotelName: {
    fontFamily: "outfit-medium",
    fontSize: width * 0.037,
  },
  price: {
    fontFamily: "outfit",
    color: "#7d7d7d",
  },
  ratings: {
    fontFamily: "outfit",
    color: Colors.PRIMARY,
  },
});
