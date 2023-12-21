import { THEME } from "@/theme";
import { Tabs } from "expo-router";

import {
  House,
  UserCircle,
  ClockCounterClockwise,
} from "phosphor-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="(home)"
      screenOptions={{
        tabBarStyle: { height: 75, backgroundColor: THEME.colors.gray[600] },
        tabBarActiveTintColor: THEME.colors.green[500],
        tabBarInactiveTintColor: THEME.colors.gray[300],
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <House
              size={size}
              color={color}
              weight={color === THEME.colors.green[500] ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(history)"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <ClockCounterClockwise
              size={size}
              color={color}
              weight={color === THEME.colors.green[500] ? "bold" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => (
            <UserCircle
              size={size}
              color={color}
              weight={color === THEME.colors.green[500] ? "bold" : "regular"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
