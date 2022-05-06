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

export const Logo = styled.Image``;

export const Title = styled.Text`
  font-size: ${RFValue(32)}px;
  top: -20px;
  margin-right: ${RFValue(20)}px;
`;
