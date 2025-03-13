import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import { CreateTripContext } from "../../context/create_trip_context";
import { StyleSheet } from "react-native";
import { width, height } from "../../constants/Dimensions";

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <View
      style={styles.container}
    >
      <GooglePlacesAutocomplete
        placeholder="Search Place..."
        fetchDetails={true}
        onFail={(error) => console.error(error)}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data.description);
          console.log(details?.geometry.location);
          console.log(details?.photos[0]?.photo_reference);
          console.log(details?.url);
          setTripData({
            locationInfo: {
              name: data.description,
              coord: details?.geometry.location,
              photoRef: details?.photos[0]?.photo_reference,
              url: details?.url,
            },
          });

          router.push("create_trip/select_traveller");
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
          language: "en",
        }}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: width * .01,
            marginTop: width * .1,
            borderColor: Colors.PRIMARY,
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * .08,
    paddingTop: width * .12,
    backgroundColor: Colors.WHITE,
    height: height * 1.5,
  }
})