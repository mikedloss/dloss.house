const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allContentfulGame {
            games: edges {
              game: node {
                id
                title
                bggId
              }
            }
          }
          allContentfulInfo {
            info: edges {
              article: node {
                id
                title
                slug
                content {
                  content
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const { games } = result.data.allContentfulGame;
        const gameInfoTemplate = path.resolve(
          'src/templates/boardgame.template.js',
        );

        games.forEach(({ game }) => {
          createPage({
            path: `/boardgame/${game.bggId}`,
            component: gameInfoTemplate,
            context: {
              bggId: game.bggId,
            },
          });
        });

        const { info } = result.data.allContentfulInfo;
        const articleTemplate = path.resolve('src/templates/article.template.js');

        info.forEach(({ article }) => {
          createPage({
            path: `/info/${article.slug}`,
            component: articleTemplate,
            context: {
              articleId: article.id,
            },
          })
        })
      }),
    );
  });
};
