import { Box, Button, HStack } from "native-base";
import React, { useCallback } from "react";
import { Alert, Dimensions, Linking, PixelRatio } from "react-native";
import { canOpenURL, openURL } from "expo-linking";
import { Container, Ico, Title, Touch } from "./styles";

export function Engajamento() {
  const tiktok = "https://www.tiktok.com/@itacoatiarabigwave?lang=pt-BR";
  const insta = "https://www.instagram.com/itacoatiarabigwave";

  const Link = useCallback(async (url) => {
    await openURL(url);
  }, []);

  return (
    <Box position="absolute" top="90%">
      <HStack space={2}>
        <Touch onPress={() => Link(insta)}>
          <Ico name="instagram" />
        </Touch>

        <Touch onPress={() => Link(tiktok)}>
          <Ico name="tiktok" />
        </Touch>
      </HStack>
    </Box>
  );
}
