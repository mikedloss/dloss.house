import cheerio from 'cheerio';
import axios from 'axios';
import * as entities from 'entities';

import { getBoardGameByBggId } from '../../../lib/contentful';

enum TYPES {
  'boardgame' = 'Board Game',
  'boardgameexpansion' = 'Board Game Expansion',
  'boardgameaccessory' = 'Board Game Accessory',
  'videogame' = 'Video Game',
  'rpgitem' = 'RPG Item',
  'rpgissue' = 'RPG Issue',
}

export const inspectBoardGame = async (_, args) => {
  const { id } = args;
  const bggUrl = `https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=${id}`;

  const data = await axios.get(bggUrl);
  const $ = cheerio.load(data.data, { xmlMode: true });

  const condensedType = $('items').find('item').first().attr().type.trim();
  const type = TYPES[condensedType] || 'Unknown';

  const bggId = parseInt($('items').find('item').attr().id);
  const title = $('name').first().attr().value.trim();
  const description = entities.decode($('description').text().trim());
  const thumbnail = $('thumbnail').text().trim();
  const image = $('image').text().trim();
  const minPlayers = parseInt($('minplayers').attr().value.trim());
  const maxPlayers = parseInt($('maxplayers').attr().value.trim());
  const minPlayingTime = parseInt($('minplaytime').attr().value.trim());
  const maxPlayingTime = parseInt($('maxplaytime').attr().value.trim());
  const averagePlayingTime = Math.ceil((minPlayingTime + maxPlayingTime) / 2);
  const bggRating = parseFloat($('statistics').find('ratings').find('average').attr().value).toFixed(1);
  const difficulty = parseFloat($('statistics').find('ratings').find('averageweight').attr().value).toFixed(2);

  let bggRank: number | null;
  let ranksObj = $('statistics').find('ratings').find('ranks').children();
  Object.keys(ranksObj).forEach((key) => {
    if (ranksObj[key].attribs && ranksObj[key].attribs.friendlyname === 'Board Game Rank') {
      bggRank = parseFloat(ranksObj[key].attribs.value);
      if (isNaN(bggRank)) {
        bggRank = null;
      }
    } else {
      return false;
    }
  });

  const categories = [];
  const mechanisms = [];
  $('link').each((_, el) => {
    if (el.attribs.type === 'boardgamecategory') {
      categories.push(el.attribs.value);
    }
    if (el.attribs.type === 'boardgamemechanic') {
      mechanisms.push(el.attribs.value);
    }
  });
  if (categories.length == 0) {
    categories.push('None');
  }
  if (mechanisms.length == 0) {
    mechanisms.push('None');
  }

  const existingGame = await getBoardGameByBggId(bggId.toString());

  const game = {
    bggId,
    type,
    title,
    description,
    thumbnail,
    image,
    minPlayers,
    maxPlayers,
    minPlayingTime,
    maxPlayingTime,
    averagePlayingTime,
    categories,
    mechanisms,
    bggRating,
    difficulty,
    bggRank,
    alreadyExists: !!existingGame.bggId,
  };

  return game;
};
