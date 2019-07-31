require('dotenv').config();

const axios = require('axios');
const _ = require('lodash');
const getBGGGame = require('./util/getBGGGame');

const buildURL = (customPath = '', hasContentTypeQuery = true) => {
  const BASE_URL = `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
  const AUTH_QUERY = `access_token=CFPAT-A51Sgzqi1zQLgq9ha3S8SBpm-9zV4TwDxMyz97DvLFE`;
  const CONTENT_TYPE = 'content_type=game&';

  return `${BASE_URL}${customPath}?${hasContentTypeQuery ? CONTENT_TYPE : ''}${AUTH_QUERY}`;
}

const removeENUS = (game) => {
  Object.keys(game.fields).forEach(k => {
    game['fields'][k] = game['fields'][k]['en-US']
  })
  return game;
}

const addENUS = (game) => {
  Object.keys(game.fields).forEach(k => {
    game['fields'][k] = {
      'en-US': game['fields'][k]
    }
  })
  return game;
}

const sleep = (ms) => {
  return new Promise(resolve=>{
      setTimeout(resolve, ms)
  })
}

const checkForUpdates = async (games) => {
  let updates = await Promise.all(games.map(async game => {
    game = removeENUS(game);
    const { fields } = game;

    const bggGame = await getBGGGame(fields.bggId);

    let needsUpdate = false;
  
    Object.keys(fields).forEach(k => {
      if (_.isArray(fields[k])) {
        if (!_.isEqual(fields[k].sort(), bggGame[k].sort())) {
          needsUpdate = true;
        }
      } else if(fields[k] != bggGame[k]) {
        needsUpdate = true;
      }
    })

    // console.log(game);

    if (needsUpdate) {
      return addENUS({ ...game, fields: bggGame });
    } else {
      return undefined
    }
  }))
  return updates.filter(n => n)
}

const updateContentful = async (game) => {
  const { fields, sys: { id } } = game;
  let { sys: { version } } = game;
  // console.log(`Updating ${game.fields.title['en-US']}`);
  // console.log('game: ', game);
  let url = buildURL(`/environments/master/entries/${id}`, false)
  // console.log('url: ', url);
  // console.log('id: ', id)
  // console.log('version: ', version)
  try {
    // update
    let data = await axios({
      url,
      method: 'put',
      data: { fields }, 
      headers: { 'X-Contentful-Version': version }
    });
    console.log(`Updated ${game.fields.title['en-US']}`);
    
    await sleep(50);
    // publish
    version = data.data.sys.version;
    url = buildURL(`/environments/master/entries/${id}/published`, false)
    data = await axios({
      url,
      method: 'put',
      headers: { 'X-Contentful-Version': version }
    });
    console.log(`Published ${game.fields.title['en-US']}`);
    
  } catch (e) { 
    console.log(`Error on ${game.fields.title['en-US']}: ${e.response.data}`);
  }  
}

const updateAllGames = async () => {
  // first, get all games 
  const url = buildURL('/environments/master/entries');
  const data = await axios.get(url);
  const gameUpdates = await checkForUpdates(data.data.items)

  // console.log(gameUpdates[0]);
  // console.log(gameUpdates.length);
  
  // lastly, update contentful
  if (gameUpdates.length) {
    let stuff = await Promise.all(gameUpdates.forEach(async game => {
      await updateContentful(game);
      await sleep(50);
    }))
    console.log(`${gameUpdates.length} games have been updated on Contentful!`)
  } else {
    console.log('No games need updated!')
  }
}

updateAllGames();