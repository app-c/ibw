import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { Feather } from "@expo/vector-icons";
import theme from "../global/styles/theme";
import { DrawerContent } from "../Components/Drawer";
import { Home } from "../pages/Home";
import { Eventos } from "../pages/Eventos";
import { Us } from "../pages/Us";
import { useAuth } from "../hooks/AuthContext";
import { News } from "../pages/AMD/News";

const Drawer = createDrawerNavigator();

const AppDrawer: React.FC = () => {
  const { user } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        drawerLabelStyle: { fontFamily: theme.fonts.REGULAR },
        headerShown: false,
        drawerActiveTintColor: theme.colors.text[2],
        drawerInactiveTintColor: theme.colors.text[4],
      }}
      initialRouteName="home"
    >
      <Drawer.Screen name="HOME" component={Home} />
      <Drawer.Screen name="EVENTOS" component={Eventos} />
      <Drawer.Screen name="QUEM SOMOS" component={Us} />
      {user.adm && (
        <Drawer.Screen name="ADICIONAR UM EVENTO" component={News} />
      )}
    </Drawer.Navigator>
  );
};

export default AppDrawer;
