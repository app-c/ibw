import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  padding-top: ${Platform.OS === `ios` ? getStatusBarHeight() : 5};
`;

export const Title = styled.Text`
  font-family: ${fonts.Bold};
`;

export const Head = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${RFValue(80)}px;
  align-items: center;

  padding: 20px;
  margin-bottom: ${RFValue(36)}px;
  justify-content: space-between;
`;

export const Logo = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
`;
