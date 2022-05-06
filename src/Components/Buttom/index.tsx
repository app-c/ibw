import React from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import theme from "../../global/styles/theme";
import { Container, Title } from "./styles";

interface Props extends TouchableOpacityProps {
  nome: string;
  pres: () => void;
  load: boolean;
}

export function Buttom({ nome, pres, load, ...rest }: Props) {
  return (
    <Container onPress={pres}>
      {load ? (
        <ActivityIndicator size="large" color={theme.colors.focus_second} />
      ) : (
        <Title>{nome}</Title>
      )}
    </Container>
  );
}
