// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { getBoardGameByBggId } from '../../../lib/contentful';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { bggId },
  } = req;

  const games = await getBoardGameByBggId(bggId as string);

  if (games.length === 0) {
    res.statusCode = 404;
  } else if (games.length > 1) {
    res.statusCode = 500;
  } else {
    res.statusCode = 200;
  }

  res.json(games);
};
