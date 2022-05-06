import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(20)}px 0;
  align-items: center;
  background-color: ${colors.primary[1]};
`;

export const Title = styled.Text`
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(36)}px;
  color: ${colors.text[2]};
`;
