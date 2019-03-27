const axios = require('axios');
const cheerio = require('cheerio');
const utf8 = require('utf8');

exports.handler = async function (event, content, callback) {
  const params = event.queryStringParameters;
  if (!('query' in params)) {
    return callback("Please send a query to search for")
  }

  const url = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${utf8.decode(params.query)}`;
  // console.log(url);
  const data = await axios.get(url);

  const $ = cheerio.load(data.data, { xmlMode: true });
  
  if ($('items').children().length === 0) {
    return callback(`No results found for "${params.query}"`);
  }

  const games = []
  $('items').find('item').each((index, game) => {
    games.push({
      id: parseInt($(game).attr().id),
      title: $(game).find('name').attr().value.trim()
    });
  })
 
  games.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
  
  const returnData = {
    games
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(returnData)
  })
}