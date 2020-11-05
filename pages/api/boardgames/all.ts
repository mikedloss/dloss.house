// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBoardGames } from '../../../lib/contentful';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const games = await getAllBoardGames();
  res.statusCode = 200;
  res.json(games);
};
