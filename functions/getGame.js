const axios = require('axios');
const cheerio = require('cheerio');
const Entities = require('html-entities').XmlEntities;

exports.handler = async function (event, content, callback) {
  console.log('EVENT', event);
  // console.log('CONTENT', content);
  // console.log('CALLBACK', callback);

  const entities = new Entities();

  const params = event.queryStringParameters;
  if (!('url' in params) && !('id' in params)) {
    return callback("Please send a URL or ID to search")
  }

  const id = (params.url && params.url.split('/')[4]) || params.id;
  const url = `https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=${id}`
  
  // console.log(url);
  const data = await axios.get(url)

  const $ = cheerio.load(data.data, { xmlMode: true });

  if ($('items').children().length === 0) {
    return callback(`Game not found (${id})`);
  }

  const condensedType = $('items').find('item').first().attr().type.trim();
  const type = types[condensedType] || 'Unknown';

  const bggId = parseInt($('items').find('item').attr().id);
  const title = $('name').first().attr().value.trim();
  const description = entities.decode($('description').text().trim());
  const thumbnail = $('thumbnail').text().trim();
  const image = $('image').text().trim()
  const minPlayers = parseInt($('minplayers').attr().value.trim());
  const maxPlayers = parseInt($('maxplayers').attr().value.trim());
  const minPlayingTime = parseInt($('minplaytime').attr().value.trim());
  const maxPlayingTime = parseInt($('maxplaytime').attr().value.trim());
  const bggRating = parseFloat($('statistics').find('ratings').find('average').attr().value).toFixed(1);
  const difficulty = parseFloat($('statistics').find('ratings').find('averageweight').attr().value).toFixed(2);
  
  const categories = [];
  const mechanisms = [];
  $('link').each((index, el) => {
    if (el.attribs.type === 'boardgamecategory') {
      categories.push(el.attribs.value);
    }
    if (el.attribs.type === 'boardgamemechanic') {
      mechanisms.push(el.attribs.value);
    }
  });

  const gameData = {
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
    categories,
    mechanisms,
    bggRating,
    difficulty,
  }

  const gameValues = Object.values(gameData);
  let hasIncompleteData = false;
  gameValues.forEach(val => {
    if (val == "" || val == "0.00") { hasIncompleteData = true; }
    if (Array.isArray(val) && val.length === 0) { hasIncompleteData = true; }
  });

  // if (hasIncompleteData) {
  //   return callback(`Looks like some data might be missing...: ${JSON.stringify(gameData)}`)
  // }

  // console.log(gameData);

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(gameData)
  })
}

const types = {
  'boardgame': 'Board Game',
  'boardgameexpansion': 'Board Game Expansion',
  'boardgameaccessory': 'Board Game Accessory',
  'videogame': 'Video Game',
  'rpgitem': 'RPG Item',
  'rpgissue': 'RPG Issue',
}