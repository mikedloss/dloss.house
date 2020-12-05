import { gql } from 'apollo-server-micro';

export const boardGame = gql`
  type BoardGame {
    bggId: ID
    title: String
    image: String
    thumbnail: String
    bggRating: String
    difficulty: String
    minPlayers: Int
    maxPlayers: Int
    minPlayingTime: Int
    maxPlayingTime: Int
    averagePlayingTime: Int
    categories: [String]
    mechanisms: [String]
    description: String
    type: String
    bggRank: Int
  }
`;

export const inspectedBoardGame = gql`
  type InspectedBoardGame {
    bggId: ID
    title: String
    image: String
    thumbnail: String
    bggRating: String
    difficulty: String
    minPlayers: Int
    maxPlayers: Int
    minPlayingTime: Int
    maxPlayingTime: Int
    averagePlayingTime: Int
    categories: [String]
    mechanisms: [String]
    description: String
    type: String
    bggRank: Int
    alreadyExists: Boolean
  }
`;

export const searchedGame = gql`
  type SearchedGame {
    id: ID
    title: String
  }
`;

export const inputBoardGame = gql`
  input InputBoardGame {
    bggId: ID
    title: String
    image: String
    thumbnail: String
    bggRating: String
    difficulty: String
    minPlayers: Int
    maxPlayers: Int
    minPlayingTime: Int
    maxPlayingTime: Int
    averagePlayingTime: Int
    categories: [String]
    mechanisms: [String]
    description: String
    type: String
    bggRank: Int
  }
`;

export const boardgameDef = gql`
  ${boardGame}
  ${inspectedBoardGame}
  ${searchedGame}
  ${inputBoardGame}
`;
