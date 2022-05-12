import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Header } from "../../Components/Header";
import { Box, Container, Loti, Title } from "./styles";

import loti from "../../assets/loti.json";

export function Us() {
  return (
    <Container>
      <Header />

      <Box>
        <Title>
          Itacoatiara Big Wave - competição de surf de ondas grandes e tow in
        </Title>

        <Loti>
          <LottieView autoPlay source={loti} />
        </Loti>
      </Box>
    </Container>
  );
}
