import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

interface SelectProps {
  select: boolean;
}

const { colors, fonts } = theme;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary[3]};
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
  font-family: ${fonts.REGULAR};
`;

export const Box = styled.View`
  padding: 20px;
  width: 100%;
`;

export const BoxSelect = styled.View`
  flex-direction: row;
  width: ${RFValue(150)}px;
  /* background: red; */
  align-items: center;
  justify-content: space-around;
`;

export const Select = styled.View<SelectProps>`
  background-color: ${({ select }) =>
    select ? colors.secundary[1] : colors.focus[1]};
  padding: 3px 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const TitleSelect = styled.Text<SelectProps>`
  color: ${({ select }) => (select ? colors.text[1] : colors.text[4])};
  font-size: ${RFValue(12)}px;
  font-family: ${fonts.Bold};
`;

export const BoxVideo = styled.View`
  margin-top: ${RFValue(36)}px;
  align-items: center;
  justify-content: center;
`;

export const ModalImage = styled.Image`
  width: ${RFValue(300)}px;
  height: ${RFValue(250)}px;
`;

export const TitleModal = styled.Text`
  color: ${colors.text[1]};
  font-size: ${RFValue(18)}px;
  font-family: ${fonts.Bold};
`;

export const TextHelp = styled.Text`
  font-family: ${fonts.REGULAR};
`;

export const TextButton = styled.Text`
  font-family: ${fonts.Bold};
`;

export const SelectButtomImage = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(35)}px;
  background-color: ${colors.text[2]};
  align-items: center;
  justify-content: center;
`;
