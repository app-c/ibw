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
import { NativeBaseProvider } from "native-base";
import { Route } from "./src/routes";
import AppProvider from "./src/hooks";
import { Splash } from "./src/pages/Splash";
import { Loading } from "./src/pages/Loading";

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
        <NativeBaseProvider>
          <StatusBar hidden style="light" />
          <Route />
        </NativeBaseProvider>
      </AppProvider>
    </NavigationContainer>
  );
}
