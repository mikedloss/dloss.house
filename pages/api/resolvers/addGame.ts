import { addBoardGame } from '../../../lib/contentful';

export const addGame = async (_, { game }) => {
  const response = await addBoardGame(game);
  return response;
};
