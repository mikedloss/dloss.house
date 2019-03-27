import styled from 'styled-components';
import { breakpointValues as bp } from './theme';

//////////////////// SMALL
export const SmallOnly = styled.div`
  @media screen and (min-width: ${bp.SMALL}px) {
    display: none;
  }
`;
export const NotSmall = styled.div`
  @media screen and (max-width: ${bp.SMALL - 1}px) {
    display: none;
  }
`;

//////////////////// MEDIUM
export const MediumOnly = styled.div`
  @media screen and (min-width: ${bp.MEDIUM}px) {
    display: none;
  }
`;
export const NotMedium = styled.div`
  @media screen and (max-width: ${bp.MEDIUM - 1}px) {
    display: none;
  }
`;

//////////////////// LARGE
export const LargeOnly = styled.div`
  @media screen and (min-width: ${bp.LARGE}px) {
    display: none;
  }
`;
export const NotLarge = styled.div`
  @media screen and (max-width: ${bp.LARGE - 1}px) {
    display: none;
  }
`;
