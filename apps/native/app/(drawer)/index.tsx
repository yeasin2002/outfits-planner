import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <View className="flex-1 bg-white">
      {/* Decorative background elements */}
      <View style={styles.decorativeTopRight} />
      <View style={styles.decorativeBottomLeft} />

      <Container className="px-6">
        <View className="pt-8">
          <Text
            className="text-[30px] font-bold mb-1"
            style={{ color: "#686F60" }}
          >
            Welcome Back
          </Text>
          <Text className="text-[13px]" style={{ color: "#828282" }}>
            Your Digital Wardrobe
          </Text>
        </View>

        {session?.user ? (
          <View className="mt-10">
            <Text className="text-base text-foreground mb-2">
              Hello, <Text className="font-medium">{session.user.name}</Text>
            </Text>
            <Text className="text-sm mb-6" style={{ color: "#828282" }}>
              {session.user.email}
            </Text>

            <View className="gap-4">
              <Pressable
                className="h-[46px] items-center justify-center rounded-[4px] active:opacity-70"
                style={{ backgroundColor: "#686F60" }}
                onPress={() => {
                  // Navigate to wardrobe or main feature
                }}
              >
                <Text className="text-white text-base font-bold">
                  View My Wardrobe
                </Text>
              </Pressable>

              <Pressable
                className="h-[46px] items-center justify-center rounded-[4px] border active:opacity-70"
                style={{ borderColor: "#828282" }}
                onPress={async () => {
                  await authClient.signOut();
                  router.replace("/");
                }}
              >
                <Text className="text-base" style={{ color: "#686F60" }}>
                  Sign Out
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View className="mt-10">
            <Text className="text-base" style={{ color: "#828282" }}>
              Loading...
            </Text>
          </View>
        )}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  decorativeTopRight: {
    position: "absolute",
    width: 675,
    height: 675,
    backgroundColor: "#686F60",
    borderRadius: 45,
    top: -51,
    right: -200,
    transform: [{ rotate: "315deg" }],
  },
  decorativeBottomLeft: {
    position: "absolute",
    width: 675,
    height: 675,
    backgroundColor: "#686F60",
    borderRadius: 45,
    bottom: -200,
    left: -400,
    transform: [{ rotate: "26.929deg" }],
  },
});
