import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";
import { width, height } from "../../constants/Dimensions";

export default function UserTripList({ userTrips }) {
  const LatestTrip = JSON.parse(userTrips[0].tripData);
  const router = useRouter();

  return (
    <View>
      <View
        style={styles.container}
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
            style={styles.imgContainer}
          />
        ) : (
          <Image
            source={require("../../assets/images/login.jpg")}
            style={styles.imgContainer}
          />
        )}
        <View
          style={styles.infoContainer}
        >
          <View>
            <Text
              style={styles.location}
              numberOfLines={1} // Keeps text to a single line and truncates with "..."
              ellipsizeMode="tail" // Adds "..." at the end if text overflows
            >
              {userTrips[0]?.tripPlan?.tripDetails?.location}
            </Text>
            <Text
              style={styles.date}
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
              style={styles.btn}
            >
              <Text
                style={styles.btnText}
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

const styles = StyleSheet.create({
  container: {
    marginTop: width * .05,
  },
  imgContainer: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    borderRadius: width * .03,
  },
  infoContainer: {
    marginTop: width * .03,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: {
    fontFamily: "outfit-medium",
    fontSize: width * .038,
    flexShrink: 1,
  },
  date: {
    fontFamily: "outfit",
    fontSize: width * .033,
    color: "#7d7d7d",
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: width * .03,
    borderRadius: width * .03,
  },
  btnText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: width * .028,
  }
});