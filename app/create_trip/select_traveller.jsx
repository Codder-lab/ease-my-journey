import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, Link } from "expo-router";
import { Colors } from "../../constants/Colors";
import { SelectTravellerList } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/create_trip_context";

export default function SelectTraveller() {
  const navigation = useNavigation();
  const [selectedTraveller, setSelectedTraveller] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, traveller: selectedTraveller });
  }, [selectedTraveller]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <ScrollView>
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
            fontSize: 35,
            fontFamily: "outfit-bold",
            marginTop: 20,
            color: Colors.ICON_DARKER,
          }}
        >
          Who's Travelling?
        </Text>

        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 23,
              color: Colors.ICON_DARK,
            }}
          >
            Choose your travellers
          </Text>
          <FlatList
            data={SelectTravellerList}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                }}
                onPress={() => setSelectedTraveller(item)}
              >
                <OptionCard option={item} selectedOption={selectedTraveller} />
              </TouchableOpacity>
            )}
            scrollEnabled={false}
            contentContainerStyle={{ paddingVertical: 10 }}
          />
        </View>

        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
            marginTop: 20,
          }}
        >
          <Link
            href={"/create_trip/select_dates"}
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: Colors.WHITE,
                fontFamily: "outfit-medium",
                fontSize: 20,
              }}
            >
              Continue
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
