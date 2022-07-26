/* eslint-disable camelcase */
import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Platform, ScrollView } from "react-native";
import { Box, HStack, Image } from "native-base";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Device from "expo-constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as FaceBook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import Auth from "@react-native-firebase/auth";
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
  Up,
} from "./styles";

import imageFundo from "../../assets/onda1.jpeg";
import fundo from "../../assets/logo-signIn.png";
import { LoginSocial } from "../../Components/LoginSocial";
import theme from "../../global/styles/theme";

interface PropsSignIn {
  email: string;
  senha: string;
}

export function SingIn() {
  GoogleSignin.configure({
    webClientId:
      "490098510390-1l8eudg3eiaac6jqjt4o61rusmt9brrd.apps.googleusercontent.com",
  });

  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const { signIn, loginSocial } = useAuth();

  const [loading, setLoading] = useState(false);

  const device = React.useMemo(() => {
    if (Platform.OS === "ios") {
      const device = Device.platform.ios.buildNumber;
      return Number(device);
    }
  }, []);

  // ?? face .................................................................
  const [request, response, prompAsync] = FaceBook.useAuthRequest({
    clientId: "637152467740970",
    responseType: ResponseType.Token,
  });

  useEffect(() => {
    console.log(response?.type);
    if (response?.type === "success") {
      const { access_token } = response.params;
      console.log(access_token);
      loginSocial(access_token);
    }
  }, [loginSocial, response]);

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
          top={Platform.OS === "ios" && device > 8 ? getStatusBarHeight() : 15}
          position="absolute"
        >
          <Image resizeMode="contain" alt="logo" source={fundo} size="110" />
        </Box>
        {/* <Box mt={5} ml={40}>
          <HStack
            top={Platform.OS === "ios" ? getStatusBarHeight() : 15}
            space="10%"
          >
            <Button
              title="OPEN"
              bg={theme.colors.secundary[2]}
              onPress={() => navigate("EVENTOS")}
              fontFamily={theme.fonts.Bold}
            >
              EVENTOS
            </Button>
            <Button
              title="OPEN"
              bg={theme.colors.secundary[2]}
              onPress={() => navigate("us")}
              fontFamily={theme.fonts.Bold}
            >
              QUEM SOMOS
            </Button>
          </HStack>
        </Box> */}
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

        <LoginSocial pres={() => prompAsync()} />
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
