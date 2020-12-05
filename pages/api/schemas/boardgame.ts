import { gql } from 'apollo-server-micro';

export const boardgameDef = gql`
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

  type SearchedGame {
    id: ID
    title: String
  }
`;
