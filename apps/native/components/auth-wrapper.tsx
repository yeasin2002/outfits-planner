import React, { type PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";
import { StyledView } from "./ui/styled";

export function AuthWrapper({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <StyledView className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {children}

      {/* Decorative Bottom Shape */}
      <StyledView
        className="absolute bottom-0 left-0 right-0 bg-[#6B7C6E]"
        style={{
          height: 400,
          borderTopLeftRadius: 200,
        }}
        pointerEvents="none"
      />
    </StyledView>
  );
}
