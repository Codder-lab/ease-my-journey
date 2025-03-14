import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import { CreateTripContext } from "../../context/create_trip_context";
import { StyleSheet } from "react-native";
import { width, height } from "../../constants/Dimensions";

export default function SelectDate() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const onDateChange = (date, type) => {
    console.log(date, type);
    if (type == "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const OnDateSelection = () => {
    if (!startDate && !endDate) {
      ToastAndroid.show("Please select Start and End Date", ToastAndroid.LONG);
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, "days");
    console.log(totalNoOfDays + 1);
    setTripData({
      ...tripData,
      startDate: startDate,
      endDate: endDate,
      totalNoOfDays: totalNoOfDays + 1,
    });

    router.push("/create_trip/select_budget");
  };

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        Travel Dates
      </Text>
      <View
        style={{
          marginTop: 30,
        }}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={10}
          selectedRangeStyle={{
            backgroundColor: Colors.ICON_DARKER,
          }}
          selectedDayTextStyle={{
            color: Colors.WHITE,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={OnDateSelection}
        style={styles.btn}
      >
        <Text
          style={styles.btnText}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: width * .06,
    paddingTop: width * .18,
    backgroundColor: Colors.WHITE,
    height: height * 1.5,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: width * .09,
    marginTop: width * .05,
    color: Colors.ICON_DARKER,
  },
  btn: {
    padding: width * .04,
    backgroundColor: Colors.PRIMARY,
    borderRadius: width * .04,
    marginTop: width * .08,
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: width * .04,
  }
});