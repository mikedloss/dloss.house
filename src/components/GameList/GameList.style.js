import styled from 'styled-components';
import { lighten } from 'polished';
import { Button } from 'rebass';

export const SelectField = styled.select`
  border: 1px solid ${props => props.theme.colors.grey};
  background-color: ${props => props.theme.colors.white};
`;

export const FilterButton = styled(Button)`
  cursor: pointer;
  :disabled {
    background-color: ${props => lighten(0.1, props.theme.colors.alternate)};
  }
`;

export const ClearFilterButton = styled(Button)`
  padding: 8px;
  border: 1px solid ${props => props.theme.colors.alternate};
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
`;
ClearFilterButton.defaultProps = {
  padding: '8px',
};
