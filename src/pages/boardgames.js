import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import GameList from '../components/GameList';

export default props => {
  const { games } = props.data.allContentfulGame;

  // add averagePlayingTime
  games.forEach(({ game }) => {
    game.averagePlayingTime = Math.ceil((game.minPlayingTime + game.maxPlayingTime) / 2);
  });

  return (
    <Layout>
      <SEO title="Board Games" keywords={[`dloss`, `games`, `boardgames`]} />
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
          bggRank
          thumbnail
        }
      }
    }
  }
`;
