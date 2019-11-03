import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const GameTitleLink = styled(Link)`
  color: ${props => props.theme.colors.black};
  transition: color 0.1s ease-in-out;

  :hover {
    color: palevioletred;
  }
`;
