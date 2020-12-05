import { getBoardGames } from './getBoardGames';
import { getBoardGame } from './getBoardGame';
import { inspectBoardGame } from './inspectBoardGame';
import { searchForBoardGame } from './searchForBoardGame';

export const resolvers = {
  Query: {
    getBoardGames,
    getBoardGame,
    searchForBoardGame,
    inspectBoardGame,
  },
};
