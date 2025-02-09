import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";
import UserTripList from "../../components/MyTrips/UserTripList";
import { useRouter } from "expo-router";

export default function Trips() {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots.
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} // Allows scrolling if content is smaller than the screen
      keyboardShouldPersistTaps="handled" // Ensures touch events work inside ScrollView
      showsVerticalScrollIndicator={false} // Optional: Hides the scrollbar
      style={{
        padding: 20,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
          }}
        >
          My Trips
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/create_trip/search_place")}
        >
          <Ionicons name="add-circle-outline" size={50} color="black" />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}

      {userTrips?.length == 0 ? (
        <StartNewTripCard />
      ) : (
        <UserTripList userTrips={userTrips} />
      )}
    </ScrollView>
  );
}
