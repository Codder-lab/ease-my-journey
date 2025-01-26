import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context/create_trip_context";
import moment from "moment";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          marginTop: 20,
        }}
      >
        Review your trip
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Before generating your trip, please review your selection
        </Text>

        {/* Destination Info */}
        <View
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            📍
          </Text>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
                color: "#7d7d7d",
              }}
            >
              Destination
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                flexWrap: "wrap",
              }}
            >
              {tripData?.locationInfo?.name}
            </Text>
          </View>
        </View>

        {/* Selected Date Info */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            📅
          </Text>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
                color: "#7d7d7d",
              }}
            >
              Travel Date
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                flexWrap: "wrap",
              }}
            >
              {moment(tripData?.startDate).format("MMM DD, YYYY") +
                "  to " +
                moment(tripData?.endDate).format("MMM DD, YYYY") +
                " "}
              ({tripData?.totalNoOfDays} days)
            </Text>
          </View>
        </View>

        {/* Traveller Info */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            🚌
          </Text>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
                color: "#7d7d7d",
              }}
            >
              Who is Travelling?
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                flexWrap: "wrap",
              }}
            >
              {tripData?.traveller?.title}
            </Text>
          </View>
        </View>

        {/* Budget Info */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
            }}
          >
            💰
          </Text>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 20,
                color: "#7d7d7d",
              }}
            >
              Budget
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                flexWrap: "wrap",
              }}
            >
              {tripData?.budget}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
        // onPress={() => onClickContinue()}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Build my trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
