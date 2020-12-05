import { gql } from 'apollo-server-micro';

import { boardgameDef } from './boardgame';
import { queryDef } from './query';

export const typeDefs = gql`
  ${boardgameDef}
  ${queryDef}
`;
