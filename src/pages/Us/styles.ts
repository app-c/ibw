import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  flex: 1;

  background-color: ${colors.primary[2]};
`;

export const Box = styled.View`
  align-items: center;
  justify-content: center;
  width: ${RFValue(250)}px;
  height: ${RFValue(400)}px;
  align-self: center;
  margin-top: ${RFValue(100)}px;
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
  font-family: ${fonts.REGULAR};
  font-size: ${RFValue(18)}px;
`;

export const Loti = styled.View`
  width: ${RFValue(250)}px;
  height: ${RFValue(250)}px;
`;
