import cheerio from 'cheerio';
import { decode } from 'utf8';
import axios from 'axios';

export const searchForBoardGame = async (_, args) => {
  const { name } = args;
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

  return games;
};
