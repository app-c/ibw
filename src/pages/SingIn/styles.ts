import { Feather } from "@expo/vector-icons";
import { Dimensions, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

function pixel(value: number) {
  const pxW = PixelRatio.getPixelSizeForLayoutSize(value);
  return pxW;
}
const lg = Dimensions.get("window").width;
const at = Dimensions.get("window").height;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #868686;
`;

export const BoxInput = styled.View`
  width: 100%;
  padding: 0 20px;
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
  margin-top: ${RFValue(160)}px;
  font-family: ${fonts.REGULAR};
`;

export const Up = styled.Text`
  color: ${colors.text[2]};
  margin-left: ${RFValue(15)}px;
  font-family: ${fonts.REGULAR};
`;

export const CreateAccount = styled.View`
  background-color: #616161;
  height: 80px;
  align-items: center;
  justify-content: center;
`;

export const BoxCreateAcc = styled.TouchableOpacity`
  padding: 10px 15px;
  flex-direction: row;
`;

export const IconAcc = styled(Feather)`
  font-size: 25px;
  color: ${colors.secundary[1]};
`;

export const ImageFundo = styled.Image`
  position: absolute;
  width: ${lg}px;
  height: ${at * 0.4}px;
  top: ${RFValue(-30)}px;
`;

export const TittleLogo = styled.Text`
  color: ${colors.text[2]};
  font-size: ${RFValue(32)}px;
  font-family: ${fonts.Bold};

  position: absolute;
  right: 0;
  top: ${RFValue(50)}px;
  left: ${RFValue(20)}px;
`;
