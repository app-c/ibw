import React, { useCallback, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { Box, Center, HStack, VStack } from "native-base";
import { ActivityIndicator } from "react-native";
import { Container, Logo, Loti, Title } from "./styles";
import logo from "../../../assets/logo.png";

export function Splash() {
  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        navigate("singIn");
      }, 2000);
    }, [navigate])
  );
  return (
    <Container>
      <VStack>
        <Center>
          <Logo resizeMode="contain" source={logo} />
          <Box mt="40">
            <ActivityIndicator size="large" />
          </Box>
        </Center>
      </VStack>
    </Container>
  );
}
