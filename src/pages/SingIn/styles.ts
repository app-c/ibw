import { Feather } from "@expo/vector-icons";
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

export const BoxInput = styled.View`
  width: 100%;
  padding: 0 20px;
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
  margin-top: ${RFValue(160)}px;
`;

export const Up = styled.Text`
  color: ${colors.text[2]};
  margin-left: ${RFValue(15)}px;
`;

export const CreateAccount = styled.View`
  background-color: ${colors.focus[1]};
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
  color: ${colors.focus_second[1]};
`;

export const ImageFundo = styled.Image`
  position: absolute;
  top: ${RFValue(-50)}px;
  opacity: 0.5;
`;

export const TittleLogo = styled.Text`
  color: ${colors.text[2]};
  font-size: ${RFValue(32)}px;
  color: ${colors.secundary[1]};

  position: absolute;
  right: 0;
  top: ${RFValue(20)}px;
  left: ${RFValue(20)}px;
`;
