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
        options={{ title: "", tabBarIcon: () => <House /> }}
      />
      <Tabs.Screen
        name="(history)"
        options={{ title: "", tabBarIcon: () => <ClockCounterClockwise /> }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "",
          tabBarIcon: () => <UserCircle />,
        }}
      />
    </Tabs>
  );
}
