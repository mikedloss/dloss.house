import { createClient, EntryCollection } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const parseBoardGames = (entries: EntryCollection<any>) => {
  return (
    entries?.items?.map(({ fields }) => {
      console.log(`fields`, fields);
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

export const getBoardGameByBggId = async (value: string) => {
  try {
    const entries = await client.getEntries({
      content_type: 'game',
      order: 'fields.title',
      'fields.bggId': value.toString(),
    });
    return parseBoardGames(entries);
  } catch (err) {
    console.log(err);
    return [];
  }
};
