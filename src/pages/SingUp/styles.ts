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

  padding: 20px;
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
  font-size: ${RFValue(16)}px;
  font-family: ${fonts.REGULAR};
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

export const TitleCreate = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${colors.text[2]};
  margin-left: 10px;
  font-family: ${fonts.REGULAR};
`;
