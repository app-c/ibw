import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";
import { SingIn } from "../pages/SingIn";
import { Home } from "../pages/Home";
import { Eventos } from "../pages/Eventos";
import theme from "../global/styles/theme";
import { Us } from "../pages/Us";
import { useAuth } from "../hooks/AuthContext";
import { News } from "../pages/AMD/News";

const { Navigator, Screen } = createBottomTabNavigator();

const tabs = [
  { name: "HOME", component: Home, icon: "home" },
  { name: "EVENTOS", component: Eventos, icon: "calendar" },
  { name: "QUEM SOMOS", component: Us, icon: "calendar" },
];

export function AuthTab() {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text[2],
        tabBarLabelStyle: { fontFamily: theme.fonts.regular },
        tabBarInactiveTintColor: theme.colors.text[3],
        tabBarStyle: {
          borderTopColor: "transparent",
          paddingTop: 5,
          paddingBottom: 10,
          height: 60,
          backgroundColor: theme.colors.focus[1],
        },
      }}
    >
      {tabs.map((tab) => (
        <Screen
          key={tab.name}
          component={tab.component}
          name={tab.name}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Entypo name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
      {/* {user.adm && (
        <Screen
          name="NEWS"
          component={News}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="plus-circle" size={size} color={color} />
            ),
          }}
        />
      )} */}
    </Navigator>
  );
}
