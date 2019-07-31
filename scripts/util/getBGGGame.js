const axios = require('axios');
const rp = require('request-promise');
const cheerio = require('cheerio');
const buildGameObject  = require('./buildGameObject');

const URL = `https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=`;

const getBGGGame = async (id) => {
  if (!id) {
    throw Error("Please give an ID to search")
  }

  let gameUrl = `${URL}${id}`;
  let options = {
    uri: gameUrl
  }
  // const data = await axios.get(gameUrl);
  const data = await rp(options);

  const $ = cheerio.load(data, { xmlMode: true });

  if ($('items').children().length === 0) {
    // return callback(`Game not found (${id})`);
    throw Error(`Game not found: ${id}`)
  }
  
  let gameData = buildGameObject($);

  const gameValues = Object.values(gameData);
  let hasIncompleteData = false;
  gameValues.forEach(val => {
    if (val == "" || val == "0.00") { hasIncompleteData = true; }
    if (Array.isArray(val) && val.length === 0) { hasIncompleteData = true; }
  });

  // if (hasIncompleteData) {
  //   // return callback(`Looks like some data might be missing...: ${JSON.stringify(gameData)}`)
  //   throw Error(`Looks like some data might be missing...: ${JSON.stringify(gameData)}`)
  // }

  return gameData;
}

module.exports = getBGGGame;