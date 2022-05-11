import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
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

import imageFundo from "../../assets/fundo.png";

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

      console.log(data.senha);

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
        <ImageFundo source={imageFundo} />
        <TittleLogo>ITACOATIARA {"\n"}BIG WAVE</TittleLogo>
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
          <Title>LOG IN</Title>
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
          <Up>CRIAR UMA CONTA</Up>
        </BoxCreateAcc>
      </CreateAccount>
    </>
  );
}
