import { gql } from 'apollo-server-micro';

export const queryDef = gql`
  type Query {
    getBoardGames: [BoardGame]
    getBoardGame(id: String!): BoardGame!
    searchForBoardGame(name: String!): [SearchedGame]
    inspectBoardGame(id: String!): InspectedBoardGame!
  }
`;
