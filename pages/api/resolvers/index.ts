import axios from 'axios';
import useSWR from 'swr';

import { getAllBoardGames, getBoardGameByBggId } from '../../../lib/contentful';

export const resolvers = {
  Query: {
    getBoardGames: async () => {
      const games = await getAllBoardGames();
      return games;
    },
    getBoardGame: async (_, args) => {
      const games = await getBoardGameByBggId(args.id);
      return games;
    },
  },
};
