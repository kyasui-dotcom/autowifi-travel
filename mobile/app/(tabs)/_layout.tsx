import React from "react";
import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "wifi", android: "wifi", web: "wifi" }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="spots"
        options={{
          title: "スポット",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "map",
                android: "location_on",
                web: "location_on",
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="esim"
        options={{
          title: "eSIM",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "simcard",
                android: "sim_card",
                web: "sim_card",
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "設定",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: "gearshape",
                android: "settings",
                web: "settings",
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
