const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allContentfulGame {
            edges {
              node {
                id
                title
                bggId
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const games = result.data.allContentfulGame.edges;
        const gameInfoTemplate = path.resolve(
          'src/templates/boardgame.template.js',
        );

        games.forEach(game => {
          createPage({
            path: `/game/${game.node.bggId}`,
            component: gameInfoTemplate,
            context: {
              bggId: game.node.bggId,
            },
          });
        });
      }),
    );
  });
};
