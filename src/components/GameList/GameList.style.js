import styled from 'styled-components';
import { Button } from 'rebass';

export const SelectField = styled.select`
  border: 1px solid ${props => props.theme.colors.grey};
  background-color: ${props => props.theme.colors.white};
`;

export const FilterButton = styled(Button)`
  cursor: pointer;
  ${props =>
    props.menuOpen &&
    `
    background-color: ${props.theme.colors.alternate};
    color: ${props.theme.colors.white};
  `}
`;