// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBoardgames } from '../../../lib/contentful';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const games = await getAllBoardgames();
  res.statusCode = 200;
  res.json(games);
};
