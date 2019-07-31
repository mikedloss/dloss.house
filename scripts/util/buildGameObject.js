const Entities = require('html-entities').XmlEntities;
const log = require('./log');

const TYPES = {
  'boardgame': 'Board Game',
  'boardgameexpansion': 'Board Game Expansion',
  'boardgameaccessory': 'Board Game Accessory',
  'videogame': 'Video Game',
  'rpgitem': 'RPG Item',
  'rpgissue': 'RPG Issue',
}

const buildGameObject = (data) => {
  const entities = new Entities();

  const condensedType = data('items').find('item').first().attr().type.trim();
  const type = TYPES[condensedType] || 'Unknown';

  const bggId = parseInt(data('items').find('item').attr().id);
  const title = data('name').first().attr().value.trim();
  const description = entities.decode(data('description').text().trim());
  const thumbnail = data('thumbnail').text().trim();
  const image = data('image').text().trim()
  const minPlayers = parseInt(data('minplayers').attr().value.trim());
  const maxPlayers = parseInt(data('maxplayers').attr().value.trim());
  const minPlayingTime = parseInt(data('minplaytime').attr().value.trim());
  const maxPlayingTime = parseInt(data('maxplaytime').attr().value.trim());
  const averagePlayingTime = Math.ceil((minPlayingTime + maxPlayingTime) / 2);
  const bggRating = parseFloat(data('statistics').find('ratings').find('average').attr().value).toFixed(1);
  const difficulty = parseFloat(data('statistics').find('ratings').find('averageweight').attr().value).toFixed(2);
  // const bggRank = data('statistics').find('ratings').find('ranks').find('rank').attr().value.trim();

  let bggRank = "Unknown Rank"
  let ranksObj = data('statistics').find('ratings').find('ranks').children()
  Object.keys(ranksObj).forEach(key => {
    if (ranksObj[key].attribs && ranksObj[key].attribs.friendlyname === 'Board Game Rank') {
      bggRank = parseFloat(ranksObj[key].attribs.value);
      if (isNaN(bggRank)) {
        bggRank = null;
      }
    } else {
      return false;
    }
  })
  
  const categories = [];
  const mechanisms = [];
  data('link').each((_, el) => {
    if (el.attribs.type === 'boardgamecategory') {
      categories.push(el.attribs.value);
    }
    if (el.attribs.type === 'boardgamemechanic') {
      mechanisms.push(el.attribs.value);
    }
  });
  if (categories.length == 0) { categories.push('None') }
  if (mechanisms.length == 0) { mechanisms.push('None') }

  return {
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
  }
}

module.exports = buildGameObject;