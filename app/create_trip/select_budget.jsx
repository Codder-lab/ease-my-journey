import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { SelectBudgetOptions } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/create_trip_context";
import { StyleSheet } from "react-native";
import { width, height } from "../../constants/Dimensions";

export default function SelectBudget() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    selectedOption &&
      setTripData({
        ...tripData,
        budget: selectedOption?.title,
      });
  }, [selectedOption]);

  const onClickContinue = () => {
    if (!selectedOption) {
      ToastAndroid.show("Select your Budget", ToastAndroid.LONG);
      return;
    }

    router.push("/create_trip/review_trip");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget</Text>

      <View
        style={{
          marginTop: width * 0.03,
        }}
      >
        <Text style={styles.subtitle}>Choose spending habit for your trip</Text>

        <FlatList
          data={SelectBudgetOptions}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                marginVertical: 10,
              }}
              onPress={() => setSelectedOption(item)}
            >
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => onClickContinue()}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: width * 0.2,
    padding: width * 0.08,
    backgroundColor: Colors.WHITE,
    height: height * 1.5,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: width * 0.09,
    marginTop: width * 0.05,
    color: Colors.ICON_DARKER,
  },
  subtitle: {
    fontFamily: "outfit-bold",
    fontSize: width * 0.05,
    color: Colors.ICON_DARK,
    marginBottom: width * 0.03,
  },
  btn: {
    padding: width * 0.04,
    backgroundColor: Colors.PRIMARY,
    borderRadius: width * 0.04,
    marginTop: width * 0.05,
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: width * 0.05,
  },
});
