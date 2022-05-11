import { FontAwesome5 } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

const lg = Dimensions.get("window").width;
const at = Dimensions.get("window").height;

export const Container = styled.View`
  /* background-color: ${colors.focus[1]}; */
  width: ${RFValue(lg)}px;
  height: ${RFValue(80)}px;
  margin-top: ${RFValue(200)}px;

  flex-direction: row;

  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
`;

export const Ico = styled(FontAwesome5)`
  font-size: ${RFValue(35)}px;
  color: ${colors.secundary[2]};
  margin-left: ${RFValue(25)}px;
`;
