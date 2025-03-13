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
import { StyleSheet } from "react-native";
import { width, height } from "../../constants/Dimensions";

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
        style={styles.container}
      >
        <Text
          style={styles.title}
        >
          Who's Travelling?
        </Text>

        <View
          style={{
            marginTop: width * .05,
          }}
        >
          <Text
            style={styles.subtitle}
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
          style={styles.btn}
        >
          <Link
            href={"/create_trip/select_dates"}
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <Text
              style={styles.btnText}
            >
              Continue
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * .06,
    paddingTop: width * .16,
    backgroundColor: Colors.WHITE,
    height: height * 1,
  },
  title: {
    fontSize: width * .09,
    fontFamily: "outfit-bold",
    marginTop: width * .05,
    color: Colors.ICON_DARKER,
  },
  subtitle: {
    fontFamily: "outfit-bold",
    fontSize: width * .06,
    color: Colors.ICON_DARK,
  },
  btn: {
    padding: width * .04,
    backgroundColor: Colors.PRIMARY,
    borderRadius: width * .03,
    marginTop: width * .06,
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: width * .05,
  }
});