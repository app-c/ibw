/* eslint-disable consistent-return */
import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";

import React, { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import FireStore from "@react-native-firebase/firestore";
import Auth from "@react-native-firebase/auth";
import { Buttom } from "../../Components/Buttom";
import { Input } from "../../Components/Input";
import { IUsersDto } from "../../dtos";
import {
  BoxCreateAcc,
  Container,
  CreateAccount,
  IconAcc,
  Title,
  TitleCreate,
} from "./styles";

export function SingUp() {
  const { goBack, navigate } = useNavigation();

  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IUsersDto) => {
      setLoading(true);

      try {
        Auth()
          .createUserWithEmailAndPassword(data.email, data.senha)
          .then((h) => {
            FireStore()
              .collection("users")
              .doc(h.user.uid)
              .set({
                nome: data.nome,
                email: data.email,
                adm: false,
              })
              .then(() => setLoading(false));

            Alert.alert("Usuário cadastrado");
            navigate("singIn");
          })
          .catch((err) => {
            console.log("erro2", err.code);
            if (err.code === "auth/email-already-in-use") {
              setLoading(false);
              return Alert.alert("Cadastro", "email já cadastrado");
            }
            if (err.code === "auth/invalid-email") {
              setLoading(false);

              return Alert.alert("Cadastro", "Informe um email válido");
            }

            if (err.code === "auth/weak-password") {
              setLoading(false);
              return Alert.alert("Cadastro", "Senha no mínimo 6 digitos");
            }
          });
      } catch (err: any) {
        console.log("err 3", err);
        // if (err instanceof Yup.ValidationError) {
        //   const errors = getValidationErrors(err);
        //   formRef.current?.setErrors(errors);
        //   Alert.alert("Cadastro", err.message);
        // }
      }
    },
    [navigate]
  );

  return (
    <>
      <Container>
        <Title>CRIAR UMA CONTA</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input nome="NOME" type="custom" name="nome" icon="user" />
          <Input
            nome="E-MAIL"
            type="custom"
            name="email"
            icon="user"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input nome="SENHA" type="custom" name="senha" icon="user" />
        </Form>

        <Buttom
          load={loading}
          pres={() => formRef.current?.submitForm()}
          nome="CRIAR"
        />
      </Container>

      <CreateAccount>
        <BoxCreateAcc onPress={() => goBack()}>
          <IconAcc name="log-out" />
          <TitleCreate>VOLTAR</TitleCreate>
        </BoxCreateAcc>
      </CreateAccount>
    </>
  );
}
