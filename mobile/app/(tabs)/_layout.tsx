import React from "react";
import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useTranslation } from "react-i18next";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

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
          title: t('tabs.home'),
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
          title: t('tabs.spots'),
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
          title: t('tabs.esim'),
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
          title: t('tabs.settings'),
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
