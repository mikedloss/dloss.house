require('dotenv').config();
var proxy = require('http-proxy-middleware');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  siteMetadata: {
    title: 'dloss.house',
    description: 'Stuff for the dloss house',
    author: 'Mike',
  },
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    );
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
      },
    },
    'gatsby-plugin-emotion',
    // {
    //   resolve: 'gatsby-plugin-styled-components',
    //   options: {
    //     displayName: isDev,
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
