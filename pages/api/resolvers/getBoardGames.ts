import { getAllBoardGames } from '../../../lib/contentful';

export const getBoardGames = async () => {
  const games = await getAllBoardGames();
  return games;
};
