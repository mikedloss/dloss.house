import { createClient as createDeliveryClient, EntryCollection } from 'contentful';
import { createClient as createManagementClient } from 'contentful-management';
import { BoardGame, InspectedBoardGame } from './models/Game';

const deliveryClient = createDeliveryClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const managementClient = createManagementClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const emptyBoardGame: BoardGame = {
  title: '',
  bggId: '',
  image: '',
  thumbnail: '',
  bggRating: '',
  difficulty: '',
  minPlayers: 0,
  maxPlayers: 0,
  minPlayingTime: 0,
  maxPlayingTime: 0,
  averagePlayingTime: 0,
  categories: [],
  mechanisms: [],
  description: '',
  type: '',
  bggRank: 0,
  playingTime: '',
  players: '',
};

const parseBoardGames = (entries: EntryCollection<any>): BoardGame[] => {
  return (
    entries?.items?.map(({ fields }) => {
      return {
        ...fields,
        playingTime: `${fields.minPlayingTime}-${fields.maxPlayingTime}`,
        players: `${fields.minPlayers}-${fields.maxPlayers}`,
      };
    }) || []
  );
};

export const getAllBoardGames = async () => {
  const entries = await deliveryClient.getEntries({
    content_type: 'game',
    limit: 1000,
    order: 'fields.title',
  });

  return parseBoardGames(entries);
};

export const getBoardGameByBggId = async (value: string): Promise<BoardGame> => {
  try {
    const entries = await deliveryClient.getEntries({
      content_type: 'game',
      order: 'fields.title',
      'fields.bggId': value.toString(),
    });
    const games = parseBoardGames(entries);
    return games.length ? games[0] : emptyBoardGame;
  } catch (err) {
    console.log(err);
    return emptyBoardGame;
  }
};

export const addBoardGame = async (game: InspectedBoardGame) => {
  const contentfulGame = {};
  Object.keys(game).forEach((field) => {
    if (field === 'bggId') {
      contentfulGame[field] = { 'en-US': parseInt(game[field]) };
    } else {
      contentfulGame[field] = { 'en-US': game[field] };
    }
  });

  const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID);
  const environment = await space.getEnvironment('master');
  const entry = await environment.createEntry('game', { fields: contentfulGame });

  await entry.publish();

  return true;
};
