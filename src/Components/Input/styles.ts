import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

interface Props {
  isError: boolean;
  isFocus: boolean;
}

export const BoxContainer = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
  margin-left: 8px;
  margin-bottom: 4px;
  font-size: ${RFValue(12)}px;
`;

export const Box = styled.View<Props>`
  padding: 5px 10px;
  background-color: ${colors.primary[1]};

  width: 100%;
  height: ${RFValue(40)}px;
  border-width: 1px;
  justify-content: center;
  margin-bottom: ${RFValue(16)}px;
  flex-direction: row;
  border-radius: ${RFValue(10)}px;
  border-color: ${colors.text[3]}
    ${({ isError }) =>
      isError &&
      css`
        border-width: 2px;
      `}
    ${({ isFocus }) =>
      isFocus &&
      css`
        border-width: 2px;
      `};
`;

export const Container = styled.TextInput`
  flex: 1;
  font-size: ${RFValue(16)}px;
  color: ${colors.text[2]};
`;

export const Icon = styled(Feather)`
  margin-right: 14px;
  align-self: center;
`;
