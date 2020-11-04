import { createClient, EntryCollection } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const parseBoardgames = (entries: EntryCollection<any>) => {
  return entries?.items?.map(({ fields }) => ({ ...fields })) || [];
};

export const getAllBoardgames = async () => {
  const entries = await client.getEntries({
    content_type: 'game',
    limit: 1000,
    order: 'fields.title',
  });

  return parseBoardgames(entries);
};

export const getBoardgameByBggId = async (value: string) => {
  try {
    const entries = await client.getEntries({
      content_type: 'game',
      order: 'fields.title',
      'fields.bggId': value.toString(),
    });
    return parseBoardgames(entries);
  } catch (err) {
    console.log(err);
    return [];
  }
};
