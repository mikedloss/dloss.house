const getBGGGame = require('../scripts/util/getBGGGame');

exports.handler = async function (event, content, callback) {
  console.log('EVENT', event);
  // console.log('CONTENT', content);
  // console.log('CALLBACK', callback);

  const params = event.queryStringParameters;
  if (!('url' in params) && !('id' in params)) {
    return callback("Please send a URL or ID to search")
  }

  const id = (params.url && params.url.split('/')[4]) || params.id;

  const gameData = await getBGGGame(id);

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify(gameData)
  })
}