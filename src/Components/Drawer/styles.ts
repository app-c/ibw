import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Platform } from "react-native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  flex: 1;
  background-color: #868686;
  padding-top: ${Platform.OS === `ios` ? getStatusBarHeight() : 5}px;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(80)}px;
  padding: 20px;
  flex-direction: row;

  align-items: center;
  background-color: ${colors.focus[1]};
  margin-bottom: ${RFValue(32)}px;
`;

export const TextContainer = styled.View`
  color: ${colors.text[2]};
  margin-left: ${RFValue(40)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${colors.text[2]};
  font-family: ${fonts.Bold};
`;

export const Avatar = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: ${RFValue(30)}px;
`;

export const TitleName = styled.Text`
  color: ${colors.text[2]};
  font-family: ${fonts.REGULAR};
`;

export const LogOf = styled.TouchableOpacity`
  width: ${RFValue(100)}px;
  background-color: ${colors.secundary[1]};
  height: ${RFValue(35)}px;
  margin-left: ${RFValue(20)}px;

  align-items: center;
  justify-content: center;
  border-radius: ${RFValue(10)}px;
  margin-top: ${RFValue(36)}px;
`;
