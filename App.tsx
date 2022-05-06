/* eslint-disable react/style-prop-object */
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { LogBox, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Route } from "./src/routes";
import AppProvider from "./src/hooks";
import { useAuth } from "./src/hooks/AuthContext";

export default function App() {
  const { signOut } = useAuth();
  LogBox.ignoreLogs([`Setting a timer for a long period`]);

  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar hidden style="light" />
        <Route />
      </AppProvider>
    </NavigationContainer>
  );
}
