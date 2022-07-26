/* eslint-disable import/extensions */
import React from "react";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/AuthContext";
import AppDrawer from "./AppDrawer";
// import { useAuth } from "../hooks/AuthContext";
import { AppStak } from "./AppStak";
import { AuthTab } from "./AuthTab";

export function Route() {
  const { user, loading } = useAuth();

  return user ? <AppDrawer /> : <AppStak />;
}
