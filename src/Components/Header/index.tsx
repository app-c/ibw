import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Box, Center } from "native-base";
import theme from "../../global/styles/theme";
import { Container, Head, Logo, Title } from "./styles";
import logo from "../../assets/logo-signIn.png";

export function Header() {
  const { dispatch } = useNavigation();
  return (
    <Container>
      <Head>
        <Logo resizeMode="contain" source={logo} />

        <TouchableOpacity onPress={() => dispatch(DrawerActions.openDrawer())}>
          <Feather
            name="menu"
            size={RFValue(40)}
            color={theme.colors.text[2]}
          />
        </TouchableOpacity>
      </Head>
    </Container>
  );
}
