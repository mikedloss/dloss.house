import { gql } from 'graphql-request';

export const fullBoardGame = gql`
  fragment FullBoardGame on BoardGame {
    bggId
    title
    image
    thumbnail
    bggRating
    difficulty
    minPlayers
    maxPlayers
    minPlayingTime
    maxPlayingTime
    categories
    mechanisms
    description
    type
    bggRank
  }
`;

export const inspectedBoardGame = gql`
  fragment InspectedBoardGame on InspectedBoardGame {
    bggId
    title
    image
    thumbnail
    bggRating
    difficulty
    minPlayers
    maxPlayers
    minPlayingTime
    maxPlayingTime
    categories
    mechanisms
    description
    type
    bggRank
    alreadyExists
  }
`;

export const allFragments = gql`
  ${fullBoardGame}
  ${inspectedBoardGame}
`;
