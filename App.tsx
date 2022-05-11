/* eslint-disable camelcase */
/* eslint-disable react/style-prop-object */
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { LogBox, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Monda_400Regular,
  Monda_700Bold,
} from "@expo-google-fonts/monda";
import { Route } from "./src/routes";
import AppProvider from "./src/hooks";
import { useAuth } from "./src/hooks/AuthContext";

export default function App() {
  LogBox.ignoreLogs([`Setting a timer for a long period`]);

  const [fontsLoaded] = useFonts({
    Monda_400Regular,
    Monda_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar hidden style="light" />
        <Route />
      </AppProvider>
    </NavigationContainer>
  );
}
