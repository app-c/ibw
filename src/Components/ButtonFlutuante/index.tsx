import React from "react";
import { Container, Icon, Title } from "./styles";

interface Props {
  pres: () => void;
}

export function ButtonFlutuante({ pres }: Props) {
  return (
    <Container onPress={pres}>
      <Icon name="plus-circle" />
    </Container>
  );
}
