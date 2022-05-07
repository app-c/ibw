import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  background-color: ${colors.text[1]};
  width: 100%;
  height: ${RFValue(80)}px;
  margin-top: ${RFValue(200)}px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
`;
