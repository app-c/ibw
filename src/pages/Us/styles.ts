import styled from "styled-components/native";
import theme from "../../global/styles/theme";

const { colors, fonts } = theme;

export const Container = styled.View`
  flex: 1;

  background-color: ${colors.primary[1]};
`;

export const Box = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${colors.text[2]};
  font-family: ${fonts.REGULAR};
`;
