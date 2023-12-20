import { Tabs } from "expo-router";

import { View, Text } from "react-native";
import { Image } from "native-base";

import {
  House,
  UserCircle,
  ClockCounterClockwise,
  SignOut,
} from "phosphor-react-native";

export default function TabsLayout() {
  return (
    <Tabs initialRouteName="(home)">
      <Tabs.Screen
        name="(home)"
        options={{
          title: "",
          header: () => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#202024",
                  padding: 6,
                  height: 125,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{ uri: "https://github.com/Alan-Graton.png" }}
                  width={50}
                  height={50}
                  ml={2}
                  rounded="full"
                  borderWidth={2}
                  borderColor="gray.400"
                  alt="Profile Picture"
                />
                <View style={{ flex: 1, padding: 6, marginLeft: 12 }}>
                  <Text style={{ color: "white", fontSize: 14 }}>Olá,</Text>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Alan Graton
                  </Text>
                </View>
                <View style={{ marginRight: 10 }}>
                  <SignOut color="white" />
                </View>
              </View>
            </>
          ),
          tabBarIcon: () => <House />,
        }}
      />
      <Tabs.Screen
        name="(history)"
        options={{
          title: "",
          header: () => (
            <>
              <View
                style={{
                  backgroundColor: "#202024",
                  padding: 4,
                  height: 125,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "#E1E1E6", fontWeight: "bold" }}
                >
                  Histórico de Exercícios
                </Text>
              </View>
            </>
          ),
          tabBarIcon: () => <ClockCounterClockwise />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "",
          header: () => (
            <>
              <View
                style={{
                  backgroundColor: "#202024",
                  padding: 4,
                  height: 125,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "#E1E1E6", fontWeight: "bold" }}
                >
                  Perfil
                </Text>
              </View>
            </>
          ),
          tabBarIcon: () => <UserCircle />,
        }}
      />
    </Tabs>
  );
}
