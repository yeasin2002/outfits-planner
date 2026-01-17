import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Text } from "react-native";

function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: "Home",
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : "#686F60" }}>Home</Text>
          ),
          drawerIcon: ({ size, color, focused }) => (
            <Ionicons name="home-outline" size={size} color={focused ? color : "#686F60"} />
          ),
        }}
      />
      <Drawer.Screen
        name="wardrobe"
        options={{
          headerTitle: "Wardrobe",
          drawerLabel: ({ color, focused }) => (
            <Text style={{ color: focused ? color : "#686F60" }}>Wardrobe</Text>
          ),
          drawerIcon: ({ size, color, focused }) => (
            <MaterialIcons name="checkroom" size={size} color={focused ? color : "#686F60"} />
          ),
        }}
      />
    </Drawer>
  );
}

export default DrawerLayout;
