import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${colors.primary[1]};
`;

export const Logo = styled.Image`
  width: ${RFValue(200)}px;
  height: ${RFValue(200)}px;
  margin-top: ${RFValue(100)}px;
  position: absolute;
`;

export const Title = styled.Text`
  font-size: ${RFValue(32)}px;
  top: -20px;
  margin-right: ${RFValue(20)}px;
  font-family: ${fonts.REGULAR};
`;

export const Loti = styled.View`
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
`;
