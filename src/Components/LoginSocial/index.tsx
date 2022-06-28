import React from "react";
import { Text, Box, Center, HStack } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface Props {
  pres: () => void;
}

export function LoginSocial({ pres }: Props) {
  return (
    <Box w="100%" p="5">
      <Text color="#FFF">LoginSocial</Text>
      <HStack mt="5" space={10}>
        <TouchableOpacity onPress={pres}>
          <FontAwesome5 color="#fff" name="facebook" size={35} />
        </TouchableOpacity>

        <TouchableOpacity>
          <FontAwesome5 color="#fff" name="facebook" size={30} />
        </TouchableOpacity>
      </HStack>
    </Box>
  );
}
