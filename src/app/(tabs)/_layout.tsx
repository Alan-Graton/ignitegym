import { Tabs } from "expo-router";

import {
  House,
  UserCircle,
  ClockCounterClockwise,
} from "phosphor-react-native";

export default function TabsLayout() {
  return (
    <Tabs initialRouteName="(home)">
      <Tabs.Screen
        name="(home)"
        options={{ title: "Home", tabBarIcon: () => <House /> }}
      />
      <Tabs.Screen
        name="(history)"
        options={{
          title: "History",
          tabBarIcon: () => <ClockCounterClockwise />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{ title: "Profile", tabBarIcon: () => <UserCircle /> }}
      />
    </Tabs>
  );
}
