import React from "react";
import { Box, Center, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Container, Icon } from "./styles";
import theme from "../../global/styles/theme";

interface Props {
  pres: () => void;
}

export function ButtonFlutuante({ pres }: Props) {
  return (
    <Box
      position="absolute"
      alignItems="center"
      justifyContent="center"
      top="80%"
      right="10"
      opacity="0.7"
    >
      <VStack>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={pres}
        >
          <Center w="98%">
            <Icon name="plus-circle" />
            <Text
              fontFamily={theme.fonts.Bold}
              color={theme.colors.text[2]}
              textAlign="center"
            >
              CADASTRAR LIVE
            </Text>
          </Center>
        </TouchableOpacity>
      </VStack>
    </Box>
  );
}
