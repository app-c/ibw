import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Image } from "native-base";
import { Header } from "../../Components/Header";
import { Box, Container, Loti, Title } from "./styles";

import loti from "../../assets/loti.json";
import fundo from "../../assets/fundo-quem-somos.jpeg";

export function Us() {
  return (
    <Container>
      <Image
        top={-30}
        width="100%"
        height="310"
        resizeMode="contain"
        opacity={0.8}
        position="absolute"
        source={fundo}
        alt="fundo"
      />
      <Header icon="menu" />

      <Box style={{ marginTop: 130 }}>
        <Title>
          Surf de Ondas Grandes e Tow In em Itacoatirara, Ilha Mãe e Laje do
          Shock. Niterói - Brasil, desde 2018.
        </Title>

        <Loti>
          <LottieView autoPlay source={loti} />
        </Loti>
      </Box>
    </Container>
  );
}
