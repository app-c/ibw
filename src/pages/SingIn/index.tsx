import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { Box, Button, Center, HStack, Image } from "native-base";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { Buttom } from "../../Components/Buttom";
import { Input } from "../../Components/Input";
import { useAuth } from "../../hooks/AuthContext";
import {
  BoxCreateAcc,
  BoxInput,
  Container,
  CreateAccount,
  IconAcc,
  ImageFundo,
  Title,
  TittleLogo,
  Up,
} from "./styles";

import imageFundo from "../../assets/onda1.jpeg";
import fundo from "../../assets/logo-signIn.png";
import theme from "../../global/styles/theme";

interface PropsSignIn {
  email: string;
  senha: string;
}

export function SingIn() {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    (data: PropsSignIn) => {
      setLoading(true);

      setTimeout(() => {
        signIn({
          email: data.email,
          senha: data.senha,
        })
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      }, 1500);
    },
    [signIn]
  );

  return (
    <>
      <Container>
        <ImageFundo resizeMode="contain" source={imageFundo} />

        <Box
          left="5"
          top={Platform.OS === "ios" ? getStatusBarHeight() : 15}
          position="absolute"
        >
          <Image resizeMode="contain" alt="logo" source={fundo} size="120" />
        </Box>
        <Box mt={5} ml={40}>
          <HStack
            top={Platform.OS === "ios" ? getStatusBarHeight() : 15}
            space="10%"
          >
            <Button
              bg={theme.colors.secundary[2]}
              onPress={() => navigate("EVENTOS")}
              fontFamily={theme.fonts.Bold}
            >
              EVENTOS
            </Button>
            <Button
              bg={theme.colors.secundary[2]}
              onPress={() => navigate("us")}
              fontFamily={theme.fonts.Bold}
            >
              QUEM SOMOS
            </Button>
          </HStack>
        </Box>
        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            alignItems: "center",
            marginTop: 100,
            height: 600,
          }}
        >
          <Title>LOGIN</Title>
          <BoxInput>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                nome="E-MAIL"
                type="custom"
                name="email"
                icon="user"
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Input
                nome="SENHA"
                secureTextEntry
                type="cel-phone"
                name="senha"
                icon="lock"
              />
            </Form>
          </BoxInput>

          <Buttom
            load={loading}
            nome="ENTRAR"
            pres={() => formRef.current?.submitForm()}
          />
        </ScrollView>
      </Container>

      <CreateAccount>
        <BoxCreateAcc onPress={() => navigate("singUp")}>
          <IconAcc name="log-in" />
          <Up>CRIE UMA CONTA</Up>
        </BoxCreateAcc>
      </CreateAccount>
    </>
  );
}
