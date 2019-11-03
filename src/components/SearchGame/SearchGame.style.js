import styled from '@emotion/styled';
import { space, height, width } from 'styled-system';
import { Text } from 'rebass';

export const Form = styled.form`
  width: 100%;
`;

export const ResultsContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const InputField = styled.input`
  ${space}
  ${height}
  ${width}
  border: 1px solid #8795a1;
  border-radius: 4px;
`;

export const GameResult = styled(Text)`
  border-radius: 4px;
  :hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;
