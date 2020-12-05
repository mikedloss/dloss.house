import { getBoardGames } from './getBoardGames';
import { getBoardGame } from './getBoardGame';
import { inspectBoardGame } from './inspectBoardGame';
import { searchForBoardGame } from './searchForBoardGame';
import { addGame } from './addGame';

export const resolvers = {
  Query: {
    getBoardGames,
    getBoardGame,
    searchForBoardGame,
    inspectBoardGame,
  },
  Mutation: {
    addGame,
  },
};
