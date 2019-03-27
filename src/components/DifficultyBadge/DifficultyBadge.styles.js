import styled from 'styled-components';
import { Text } from 'rebass';
import { borderRadius, border } from 'styled-system';

export const SmallBadge = styled(Text)`
  ${border}
  ${borderRadius}
`;
