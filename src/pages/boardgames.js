import React from 'react';
import { Link, graphql } from 'gatsby';
import { Flex, Box, Heading, Text } from 'rebass';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import GameList from '../components/GameList';

import * as Media from '../components/Elements/media';

export default props => {
  const { games } = props.data.allContentfulGame;

  // add averagePlayingTime
  games.forEach(({ game }) => {
    game.averagePlayingTime = Math.ceil((game.minPlayingTime + game.maxPlayingTime) / 2);
  });

  return (
    <Layout>
      <SEO title="Games" keywords={[`gatsby`, `application`, `react`]} />
      <GameList games={games} />
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    allContentfulGame {
      games: edges {
        game: node {
          title
          bggId
          minPlayers
          maxPlayers
          minPlayingTime
          maxPlayingTime
          difficulty
          bggRating
          thumbnail
        }
      }
    }
  }
`;
