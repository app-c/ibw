import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Logo, Title } from "./styles";
import logo from "../../assets/logo1.png";

export function Splash() {
  const { navigate } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate("singIn");
    }, 1000);
  }, [navigate]);

  return (
    <Container>
      <Logo resizeMode="contain" source={logo} />
    </Container>
  );
}
