import { gql } from 'apollo-server-micro';

import { boardgameDef } from './boardgame';
import { queryDef } from './query';
import { mutationDef } from './mutation';

export const typeDefs = gql`
  ${boardgameDef}
  ${queryDef}
  ${mutationDef}
`;
