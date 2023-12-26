import { Tabs } from "expo-router";

import {
  House,
  UserCircle,
  ClockCounterClockwise,
} from "phosphor-react-native";

import { THEME } from "@/theme";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: {
          height: 75,
          backgroundColor: THEME.colors.gray[600],
          borderColor: THEME.colors.gray[600],
        },
        tabBarActiveTintColor: THEME.colors.green[500],
        tabBarInactiveTintColor: THEME.colors.gray[300],
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <House
              size={size}
              color={color}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <ClockCounterClockwise
              size={size}
              color={color}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <UserCircle
              size={size}
              color={color}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
