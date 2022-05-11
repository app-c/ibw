import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

import { sizeH, sizeW } from "../../utils";

const { colors, fonts } = theme;

export const Container = styled.TouchableOpacity`
  top: ${sizeH(0.7)}px;
  left: ${sizeW(0.76)}px;

  background-color: ${colors.secundary[2]};
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(25)}px;

  position: absolute;

  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(45)}px;
  color: ${colors.text[3]};
`;

export const Title = styled.Text``;
