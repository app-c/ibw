import { FontAwesome5 } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Alert, Dimensions, Linking, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Box, Container, Ico, Title } from "./styles";

export function Engajamento() {
  const widthApp = Dimensions.get("window").width / 100;
  const heightApp = Dimensions.get("window").height / 100;
  const pxW = PixelRatio.getPixelSizeForLayoutSize(200);

  console.log({ altura: heightApp, largura: widthApp }, pxW);

  const supportedURL = "https://google.com";

  const unsupportedURL = "slack://open?team=123456";

  const Link = useCallback(async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (
    <Container>
      <Box
        onPress={() =>
          Link("https://www.tiktok.com/@itacoatiarabigwave?lang=pt-BR")
        }
      >
        <Ico name="tiktok" />
      </Box>

      <Box onPress={() => Link("https://www.instagram.com/itacoatiarabigwave")}>
        <Ico name="instagram" />
      </Box>
    </Container>
  );
}
