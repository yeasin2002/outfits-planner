import type { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { StyledIonicons, StyledMaterialIcons } from "./ui/styled";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];
type MaterialIconsName = React.ComponentProps<typeof MaterialIcons>["name"];

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Home",
      icon: "home" as IoniconsName,
      iconOutline: "home-outline" as IoniconsName,
      path: "/(drawer)",
      matchPaths: ["/", "/(drawer)"],
      IconComponent: StyledIonicons,
    },
    {
      name: "Wardrobe",
      icon: "checkroom" as MaterialIconsName,
      iconOutline: "checkroom" as MaterialIconsName,
      path: "/(drawer)/wardrobe",
      matchPaths: ["/wardrobe"],
      IconComponent: StyledMaterialIcons,
    },
    {
      name: "Outfits",
      icon: "shirt" as IoniconsName,
      iconOutline: "shirt-outline" as IoniconsName,
      path: "/(drawer)/outfits",
      matchPaths: ["/outfits"],
      IconComponent: StyledIonicons,
    },
    {
      name: "Settings",
      icon: "settings" as IoniconsName,
      iconOutline: "settings-outline" as IoniconsName,
      path: "/(drawer)/settings",
      matchPaths: ["/settings"],
      IconComponent: StyledIonicons,
    },
  ];

  const isActive = (matchPaths: string[]) => {
    return matchPaths.some((path) => {
      if (path === "/" || path === "/(drawer)") {
        return pathname === "/" || pathname === "/(drawer)";
      }
      return pathname.startsWith(path);
    });
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-[#686F60] flex-row items-center justify-around h-21.5 px-4">
      {navItems.map((item) => {
        const active = isActive(item.matchPaths);
        const IconComponent = item.IconComponent;

        return (
          <Pressable
            key={item.name}
            className="flex-1 items-center justify-center active:opacity-70"
            onPress={() => router.push(item.path as any)}
          >
            {active ? (
              <View className="items-center gap-1">
                <Text
                  className="text-white text-center"
                  style={{
                    fontFamily: "Caudex_700Bold",
                    fontSize: 16,
                    lineHeight: 19.2,
                  }}
                >
                  {item.name}
                </Text>
                <View className="w-3 h-3 bg-[#EE9250] rounded-full" />
              </View>
            ) : (
              <IconComponent name={item.iconOutline as any} size={36} className="text-white" />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
