import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Image } from "native-base";
import { Header } from "../../Components/Header";
import { Box, Container, Loti, Title } from "./styles";

import loti from "../../assets/loti.json";
import fundo from "../../assets/fundo-onda.jpg";

export function Us() {
  return (
    <Container>
      <Image
        top={-10}
        opacity={0.8}
        position="absolute"
        source={fundo}
        alt="fundo"
      />
      <Header />

      <Box>
        <Title>
          Competição de surf de ondas grandes e tow in na Praia de Itacoatiara e
          lage do Shock
        </Title>

        <Loti>
          <LottieView autoPlay source={loti} />
        </Loti>
      </Box>
    </Container>
  );
}
