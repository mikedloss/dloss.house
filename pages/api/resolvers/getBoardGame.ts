import { getBoardGameByBggId } from '../../../lib/contentful';

export const getBoardGame = async (_, args) => {
  const game = await getBoardGameByBggId(args.id);
  return game;
};
