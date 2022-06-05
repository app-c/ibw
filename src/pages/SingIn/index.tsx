import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Box, Image } from "native-base";
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
        <Box left="5" top={15} position="absolute">
          <Image resizeMode="contain" alt="logo" source={fundo} size="120" />
        </Box>
        <ScrollView
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            alignItems: "center",
            marginTop: 120,
            height: 800,
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
