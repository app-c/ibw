import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.TouchableOpacity`
  width: ${RFValue(200)}px;
  height: ${RFValue(40)}px;
  background-color: ${colors.secundary[1]};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
  font-size: ${RFValue(16)}px;
`;
