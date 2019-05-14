import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { Flex, Heading, Box } from 'rebass';

import Layout from '../components/Layout';
import GameProfile from '../components/GameProfile';

const BoardGameTemplate = ({ data: { game } }) => {
  if (typeof game.description === 'object') {
    const { description } = game.description;
    game.description = description;
  }
  return (
    <Layout>
      <Flex flexDirection="column" alignItems="flex-start">
        <Link to="/boardgames">
          <Heading fontSize={2} mb="0.5rem">
            ← Return to game list
          </Heading>
        </Link>
        <Box width="100%">
          <hr />
        </Box>
        <GameProfile game={game} />
      </Flex>
    </Layout>
  );
};

export default BoardGameTemplate;

export const pageQuery = graphql`
  query GameByBggId($bggId: Int) {
    game: contentfulGame(bggId: { eq: $bggId }) {
      averagePlayingTime
      bggId
      bggRating
      bggRank
      categories
      description {
        description
      }
      difficulty
      image
      minPlayers
      minPlayingTime
      maxPlayers
      maxPlayingTime
      mechanisms
      title
      type
      updatedAt
    }
  }
`;
