import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Dimensions, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Container, Ico, Title } from "./styles";

export function Engajamento() {
  const widthApp = Dimensions.get("window").width / 100;
  const heightApp = Dimensions.get("window").height / 100;
  const pxW = PixelRatio.getPixelSizeForLayoutSize(200);

  console.log({ altura: heightApp, largura: widthApp }, pxW);
  return (
    <Container>
      <Ico name="facebook" />
      <Ico name="instagram" />
    </Container>
  );
}
