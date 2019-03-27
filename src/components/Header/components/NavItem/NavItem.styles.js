import styled from 'styled-components';
import { Text } from 'rebass';
import { breakpointValues as bp } from '../../../Elements/theme';

export const NavItem = styled(Text)`
  text-align: center;
  margin: 16px auto;

  @media screen and (min-width: ${bp.SMALL}px) {
    margin-right: 16px;
  }
`;

// li content
export const NavContent = styled(Text)`
  text-decoration: none;
`;
