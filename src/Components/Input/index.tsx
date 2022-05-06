/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import {
  TextInputMaskTypeProp,
  TextInputMaskProps,
} from "react-native-masked-text";
import { Box, BoxContainer, Container, Icon, Title } from "./styles";
import theme from "../../global/styles/theme";

interface Props extends TextInputProps {
  name: string;
  icon: string;
  type: TextInputMaskTypeProp;
  nome: string;
}

interface Reference {
  value: string;
}

export function Input({ name, nome, icon, type, ...rest }: Props) {
  const [isFocused, setsFocused] = useState(false);
  const [isFilled, setsFilled] = useState(false);
  const [text, setText] = useState("");

  const handleInput = useCallback(() => {
    setsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setsFocused(false);
    setsFilled(!!inpuValueRef.current.value);
  }, []);

  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inpuValueRef = useRef<Reference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inpuValueRef.current,
      path: "value",
      setValue(ref: any, value) {
        inpuValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inpuValueRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <BoxContainer>
      <Title>{nome}</Title>
      <Box isFocus={isFocused} isError={!!error}>
        <Icon
          name={icon}
          size={20}
          color={
            isFocused || isFilled ? theme.colors.text[2] : theme.colors.text[3]
          }
        />
        <Container
          type={type}
          name={name}
          ref={inputElementRef}
          onFocus={handleInput}
          onBlur={handleBlur}
          defaultValue={defaultValue}
          onChangeText={(form) => {
            inpuValueRef.current.value = form;
            setText(form);
          }}
          value={text}
          {...rest}
        />
      </Box>
    </BoxContainer>
  );
}
