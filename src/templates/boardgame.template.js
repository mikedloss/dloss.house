import * as React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import GameProfile from '../components/GameProfile';

const BoardGameTemplate = ({ data: { game } }) => {
  const { description } = game.description;
  game.description = description;
  return (
    <Layout>
      <GameProfile game={game} />
    </Layout>
  );
};

export default BoardGameTemplate;

export const pageQuery = graphql`
  query GameByBggId($bggId: Int) {
    game: contentfulGame(bggId: { eq: $bggId }) {
      title
      bggId
      image
      bggRating
      difficulty
      minPlayers
      maxPlayers
      minPlayingTime
      maxPlayingTime
      categories
      mechanisms
      description {
        description
      }
      type
    }
  }
`;
