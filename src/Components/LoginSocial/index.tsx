import React from "react";
import { Text, Box, Center, HStack } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity } from "react-native";
import theme from "../../global/styles/theme";

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
          <HStack space={3}>
            <FontAwesome5 color="#fff" name="facebook" size={35} />
            <Text fontFamily={theme.fonts.Bold} mt="2" color="#FFF">
              Entrar com Facebook
            </Text>
          </HStack>
        </Center>
      </TouchableOpacity>
    </Box>
  );
}
