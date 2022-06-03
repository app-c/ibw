import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  flex: 1;

  background-color: ${colors.primary[1]};
`;

export const BoxPlayer = styled.View`
  background-color: ${colors.text[2]};
  width: 100%;
  max-height: ${RFPercentage(70)}%;
  align-items: center;
  padding: 0 0 20px;
  margin-top: ${RFValue(130)}px;
`;

export const Header = styled.View`
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

export const Avatar = styled.Image`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;
  border-radius: 30px;
  background-color: ${colors.focus[1]};
`;

export const BoxText = styled.View`
  width: 100%;
  padding: 0 20px;
  /* background-color: ${colors.secundary[2]}; */
  /* margin-top: ${RFValue(-50)}px; */
`;
export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${fonts.Bold};
`;

export const TitleDesciption = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${fonts.REGULAR};
`;
