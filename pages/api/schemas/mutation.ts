import { gql } from 'apollo-server-micro';

export const mutationDef = gql`
  type Mutation {
    addGame(game: InputBoardGame): InspectedBoardGame!
  }
`;
