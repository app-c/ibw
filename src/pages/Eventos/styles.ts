import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  flex: 1;
  background-color: #868686;
`;

export const Box = styled.View`
  padding: ${RFValue(20)}px 0;

  align-items: center;
`;

export const Title = styled.Text`
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(36)}px;
  color: ${colors.text[2]};
  font-family: ${fonts.REGULAR};
`;
