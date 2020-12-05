import { createClient, EntryCollection } from 'contentful';
import { BoardGame } from './models/Game';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const emptyBoardGame: BoardGame = {
  title: '',
  bggId: 0,
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
  const entries = await client.getEntries({
    content_type: 'game',
    limit: 1000,
    order: 'fields.title',
  });

  return parseBoardGames(entries);
};

export const getBoardGameByBggId = async (value: string): Promise<BoardGame> => {
  try {
    const entries = await client.getEntries({
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
