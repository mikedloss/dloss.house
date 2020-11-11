// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import isEmpty from 'lodash/isEmpty';
import cheerio from 'cheerio';
import { decode } from 'utf8';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  if (isEmpty(query)) {
    res.statusCode = 500;
    return res.send('At least 1 query required');
  }

  const { name } = query;

  if (!name) {
    res.statusCode = 500;
    return res.send('Name is required');
  }

  const bggUrl = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${decode(name)}`;

  const data = await axios.get(bggUrl);
  const $ = cheerio.load(data.data, { xmlMode: true });

  const games = [];
  $('items')
    .find('item')
    .each((index, game) => {
      games.push({
        id: $(game).attr().id.toString(),
        title: $(game).find('name').attr().value.trim(),
      });
    });

  games.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

  res.statusCode = 200;
  res.json(games);
};
