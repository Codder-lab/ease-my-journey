import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips }) {
  const LatestTrip = JSON.parse(userTrips[0].tripData);
  const router = useRouter();

  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        {LatestTrip?.locationInfo?.photoRef ? (
          <Image
            source={{
              uri:
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                LatestTrip.locationInfo?.photoRef +
                "&key=" +
                process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            }}
            style={{
              width: "100%",
              height: 240,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
        ) : (
          <Image
            source={require("../../assets/images/login.jpg")}
            style={{
              width: "100%",
              height: 240,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
        )}
        <View
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 16,
                flexShrink: 1, // Prevents overflow and allows shrinking
              }}
              numberOfLines={1} // Keeps text to a single line and truncates with "..."
              ellipsizeMode="tail" // Adds "..." at the end if text overflows
            >
              {userTrips[0]?.tripPlan?.tripDetails?.location}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 13,
                color: "#7d7d7d",
              }}
            >
              {moment(LatestTrip.startDate).format("DD MMM YYYY")} - {moment(LatestTrip.endDate).format("DD MMM YYYY")}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/trip_details",
                  params: {
                    trip: JSON.stringify(userTrips[0]),
                  },
                })
              }
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 12,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: Colors.WHITE,
                  textAlign: "center",
                  fontFamily: "outfit-medium",
                  fontSize: 12,
                }}
              >
                See your plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {userTrips.map((trip, index) => (
        <UserTripCard trip={trip} key={index} />
      ))}
    </View>
  );
}
