import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  width: 100%;
  /* height: ${RFValue(270)}px; */
  border-radius: 10px;
  background-color: ${colors.text[2]};
  margin-bottom: ${RFValue(24)}px;
  align-items: center;
`;

export const BoxDescricao = styled.View`
  width: 100%;
  padding: 8px 10px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${fonts.Bold};
`;

export const Description = styled.Text`
  font-size: ${RFValue(12)}px;
  font-family: ${fonts.Bold};
`;
