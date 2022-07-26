/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Box, Center } from "native-base";
import theme from "../../global/styles/theme";
import { Container, Head, Logo, Title } from "./styles";
import logo from "../../assets/logo-signIn.png";
import { useAuth } from "../../hooks/AuthContext";

type Props = {
  pres?: () => void;
  icon: string;
};

export function Header({ pres, icon }: Props) {
  const auth = useAuth();
  console.log(auth.user);
  const { dispatch, goBack } = useNavigation();

  return (
    <Container>
      <Head>
        <Logo resizeMode="contain" source={logo} />

        <TouchableOpacity
          onPress={() => {
            auth.user ? dispatch(DrawerActions.openDrawer()) : goBack();
          }}
        >
          {auth.user ? (
            <Feather
              name={icon}
              size={RFValue(40)}
              color={theme.colors.text[2]}
            />
          ) : (
            <Feather name="arrow-left" size={36} color="#fff" />
          )}
        </TouchableOpacity>
      </Head>
    </Container>
  );
}
