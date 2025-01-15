import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="Trips"
        options={{
          tabBarLabel: "My Trips",
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-sharp" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Discover"
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-sharp" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
