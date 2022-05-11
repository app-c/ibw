import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View``;

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
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
`;
