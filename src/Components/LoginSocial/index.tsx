import React from "react";
import { Text, Box, Center, HStack } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity } from "react-native";

interface Props {
  pres: () => void;
}

const wt = Dimensions.get("window").width;
const wh = Dimensions.get("window").height;

export function LoginSocial({ pres }: Props) {
  return (
    <Box position="absolute" top={wh * 0.75} w="100%" p="5">
      <TouchableOpacity onPress={pres}>
        <Center>
          <HStack space={5}>
            <FontAwesome5 color="#fff" name="google" size={35} />
            <Text mt="2" color="#FFF">
              Entrar com uma conta Google
            </Text>
          </HStack>
        </Center>
      </TouchableOpacity>
    </Box>
  );
}
