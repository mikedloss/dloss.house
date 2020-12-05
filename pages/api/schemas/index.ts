import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type BoardGame {
    title: String
    bggId: ID
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

  type Query {
    getBoardGames: [BoardGame]
    getBoardGame(id: String!): [BoardGame!]
  }
`;