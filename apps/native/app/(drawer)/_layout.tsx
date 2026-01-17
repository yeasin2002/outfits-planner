import { BottomNavigation } from "@/components/bottom-navigation";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Text, View } from "react-native";

function DrawerLayout() {
  return (
    <View className="flex-1">
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
        <Drawer.Screen
          name="outfits"
          options={{
            headerTitle: "Outfits",
            drawerLabel: ({ color, focused }) => (
              <Text style={{ color: focused ? color : "#686F60" }}>Outfits</Text>
            ),
            drawerIcon: ({ size, color, focused }) => (
              <Ionicons name="shirt-outline" size={size} color={focused ? color : "#686F60"} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            headerTitle: "Settings",
            drawerLabel: ({ color, focused }) => (
              <Text style={{ color: focused ? color : "#686F60" }}>Settings</Text>
            ),
            drawerIcon: ({ size, color, focused }) => (
              <Ionicons name="settings-outline" size={size} color={focused ? color : "#686F60"} />
            ),
          }}
        />
      </Drawer>
      <BottomNavigation />
    </View>
  );
}

export default DrawerLayout;
