require('dotenv').config();

const axios = require('axios');
const rp = require('request-promise');
const _ = require('lodash');

const getBGGGame = require('./util/getBGGGame');
const enUS = require('./util/enUS');
const sleep = require('./util/sleep');
const log = require('./util/log');

const buildURL = (customPath = '', hasContentTypeQuery = true) => {
  const BASE_URL = `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
  const AUTH_QUERY = `access_token=CFPAT-A51Sgzqi1zQLgq9ha3S8SBpm-9zV4TwDxMyz97DvLFE`;
  const CONTENT_TYPE = 'content_type=game&';

  return `${BASE_URL}${customPath}?${hasContentTypeQuery ? CONTENT_TYPE : ''}${AUTH_QUERY}`;
}

const checkForUpdates = async (games) => {
  let updates = await Promise.all(games.map(async game => {
    game = enUS.remove(game);
    const { fields } = game;
    const customGame = ['Jenga'].includes(fields.title);

    log.debug(`Getting ${fields.title} from BGG`);
    const bggGame = await getBGGGame(fields.bggId);
    // await sleep(1000);

    customGame && log.debug(`====================`)
    customGame && log.debug(`Checking for updates on ${fields.title}`);
    customGame && log.debug(fields);

    let needsUpdate = false;
  
    Object.keys(bggGame).forEach(k => {
      customGame && log.debug(`k = ${k}`)
      customGame && log.debug('fields[k]: ', fields[k])
      customGame && log.debug('bggGame[k]:', bggGame[k])
      if (_.isArray(bggGame[k])) {
        customGame && log.debug('bggGame[k] is an array')
        if (!fields[k]) {
          log.debug(`bggGame[k] is empty (${_.isEmpty(bggGame[k])}) and we have nothing in fields[k] (${fields[k]})`);
          needsUpdate = true;
        } else if (!_.isEqual(bggGame[k].sort(), fields[k].sort())) {
          log.debug(`Need to update ${fields.title} because of ${k} (an array)`);
          needsUpdate = true;
        }
      } else if(bggGame[k] != fields[k]) {
        log.debug(`Need to update ${bggGame.title} because of ${k}`);
        needsUpdate = true;
      }
    })

    customGame && log.debug(`====================`)
    if (needsUpdate) {
      return enUS.add({ ...game, fields: bggGame });
    }
  }))

  updates = updates.filter(n => n);
  return updates;
}

const updateEntry = async (game) => {
  const { fields, sys: { id } } = game;
  const { sys: { version } } = game;
  // log.debug('UPDATING -> game', game)
  const url = buildURL(`/environments/master/entries/${id}`, false)
  const options = {
    uri: url,
    method: 'put',
    body: { fields },
    json: true,
    headers: {
      'X-Contentful-Version': version,
    }
  }
  // log.debug('UPDATING -> options', options)
  log.info(`Updating ${fields.title['en-US']}`);
  let data;
  try {
    data = await rp(options);
  } catch (e) {
    log.error(`Error with ${game.fields.title['en-US']}`, e)
  } finally {
    log.debug('UPDATING - WAITING 1 SECOND')
    await sleep(2000);
    log.debug('UPDATING - 1 SECOND has PASSED')
    // console.log(data)
    return data;
  }
}

const publishEntry = async (game) => {
  const { sys: { id } } = game;
  const { sys: { version } } = game;
  // log.debug('PUBLISHING -> game', game)
  const url = buildURL(`/environments/master/entries/${id}/published`, false)
  const options = {
    uri: url,
    method: 'put',
    headers: {
      'X-Contentful-Version': version,
    }
  }
  // log.debug('PUBLISHING -> options', options)
  log.info(`Publishing ${game.fields.title['en-US']}, version ${version}`);
  let data;
  try {
    data = await rp(options)
  } catch (e) {
    log.error(`Error with ${game.fields.title['en-US']}`, e)
  } finally {
    log.debug('PUBLISHING - WAITING 1 SECOND')
    await sleep(1000);
    log.debug('PUBLISHING - 1 SECOND has PASSED')
    return data;
  }
}

const updateContentful = async (games) => {
  const delayIncrement = 500;
  let delay = 0;
  let updates = await Promise.all(games.map(async game => {
    new Promise(resolve => setTimeout(resolve, delay)).then(async () => {
      let updatedEntry = await updateEntry(game);
      await sleep(1000);
      let publishedEntry = await publishEntry(updatedEntry);
      return publishedEntry;
    })
    delay += delayIncrement;
  }))

  return updates;
}

const updateAllGames = async () => {
  // first, get all games 
  const url = buildURL('/environments/master/entries');
  const data = await axios.get(url);
  log.info('Checking for game updates...')
  const gameUpdates = await checkForUpdates(data.data.items)
  log.info('Finished checking for game updates')
  
  // lastly, update contentful
  if (gameUpdates.length) {
    let contentfulUpdates = await updateContentful(gameUpdates);
    console.log(contentfulUpdates);
    log.info(`${gameUpdates.length} games have been updated on Contentful! 🎉`)
  } else {
    log.info('No games need updated!')
  }
}

updateAllGames();