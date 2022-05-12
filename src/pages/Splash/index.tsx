import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { Container, Logo, Loti, Title } from "./styles";
import logo from "../../assets/logo1.png";

import loti from "../../assets/loti.json";

export function Splash() {
  const { navigate } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate("singIn");
    }, 2000);
  }, [navigate]);

  return (
    <Container>
      <Logo resizeMode="contain" source={logo} />

      <Loti>
        <LottieView autoPlay source={loti} />
      </Loti>
    </Container>
  );
}
