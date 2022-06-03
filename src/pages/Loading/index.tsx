import React from "react";
import { NativeBaseProvider, Text, Box } from "native-base";
import theme from "../../global/styles/theme";

export function Loading() {
  return (
    <Box flex={1} bg={theme.colors.primary[1]}>
      <Text>Loading</Text>
    </Box>
  );
}
