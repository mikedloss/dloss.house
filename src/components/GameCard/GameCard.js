import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text, Box, Flex, Card, Image } from 'rebass';

import DifficultyBadge from '../../../../components/DifficultyBadge';

import * as Styles from './GameCard.styles';
import * as Media from '../../../Elements/media';

export const GameCard = ({ game }) => {
  // console.log(game);
  return (
    <Card borderRadius="4px" boxShadow="0 4px 8px rgba(0, 0, 0, 0.25)" p="1rem" mb="1rem" width="100%">
      <Flex
        flexDirection={['column', 'row']}
        width="100%"
        alignItems={['flex-start', 'center']}
        justifyContent={['center', 'flex-start']}
      >
        <Flex width={['100%', '50%']} alignItems="center" mb={['0.5rem', null]}>
          <Media.NotSmall>
            <Image src={game.thumbnail} width="80px" ml="0.5rem" />
          </Media.NotSmall>
          <Heading pl={[null, '1rem']}>
            <Styles.GameTitleLink to={`/game/${game.bggId}`}>{game.title}</Styles.GameTitleLink>
            <DifficultyBadge difficulty={game.difficulty} />
          </Heading>
        </Flex>
        <Flex width={['100%', '50%']} alignItems={['flex-end', 'center']}>
          <Box width="25%">
            <Flex flexDirection="column">
              <Text fontSize={0} color="grey">
                Rating
              </Text>
              <Text>{game.bggRating ? game.bggRating : '?'}</Text>
            </Flex>
          </Box>
          <Box width="25%">
            <Flex flexDirection="column">
              <Text fontSize={0} color="grey">
                Difficulty
              </Text>
              <Text>{game.difficulty ? game.difficulty : '?'}</Text>
            </Flex>
          </Box>
          <Box width="25%">
            <Flex flexDirection="column">
              <Text fontSize={0} color="grey">
                Players
              </Text>
              {game.minPlayers && game.maxPlayers ? (
                <Text>
                  {game.minPlayers}-{game.maxPlayers}
                </Text>
              ) : (
                <Text>?</Text>
              )}
            </Flex>
          </Box>
          <Box width="25%">
            <Flex flexDirection="column">
              <Text fontSize={0} color="grey">
                Playing Time
              </Text>
              {game.minPlayingTime && game.maxPlayingTime ? (
                <Text>
                  {game.minPlayingTime}-{game.maxPlayingTime}
                </Text>
              ) : (
                <Text>?</Text>
              )}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    bggId: PropTypes.number.isRequired,
    bggRating: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    maxPlayers: PropTypes.number.isRequired,
    maxPlayingTime: PropTypes.number.isRequired,
    minPlayers: PropTypes.number.isRequired,
    minPlayingTime: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }),
};
