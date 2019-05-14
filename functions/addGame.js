const contentful = require('contentful-management');
require('dotenv').config();

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

exports.handler = async function(event, content, callback) {
  // console.log('EVENT', event)
  // console.log('CONTENT', content)
  let { body } = event;
  body = JSON.parse(body);

  // get entries, refuse to add any with the same ID and title
  // try {
  //   const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
  //   const environment = await space.getEnvironment('master');
  //   const allEntries = await environment.getEntries();

  //   allEntries.items.forEach(item => {
  //     const { title, bggId } = item.fields;
  //     if (title['en-US'] == body.fields.title['en-US']) {
  //       throw Error(`Found a game with the same name (${title['en-US']})`)
  //     }
  //     if (title['en-US'] == body.fields.title['en-US'] || bggId['en-US'] == body.fields.bggId['en-US']) {
  //       throw Error(`Found a game with the same ID (${bggId['en-US']})`)
  //     }
  //   })
  // } catch (error) {
  //   // probably found a game with the same name / ID
  //   console.log(error)
  //   return callback(error.toString().replace('Error: ', ''));
  // }

  let entry;
  let publishedEntry;

  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    // console.log("SPACE", space)
    const environment = await space.getEnvironment('master');
    // console.log("ENVIRONMENT", environment);
    entry = await environment.createEntry('game', body);
    publishedEntry = await entry.publish();
    // console.log("ENTRY", publishedEntry);

    const returnEntry = {
      published: true,
      id: publishedEntry.sys.id,
      ...publishedEntry.fields,
    };

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(returnEntry),
    });
  } catch (error) {
    // delete the entry if it exists i guess
    const { message } = error;
    console.log('-------------------------');
    console.log('ERROR', error);
    console.log('-------------------------');
    await entry.delete();
    return callback(JSON.stringify(error));
  }
};
