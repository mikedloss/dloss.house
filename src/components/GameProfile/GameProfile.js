import React, { useState } from 'react';
import { Flex, Box, Text, Heading, Image } from 'rebass';
import Confetti from 'react-dom-confetti';

import DifficultyBadge from '../../components/DifficultyBadge';
import * as Media from '../Elements/media';

export const GameProfile = ({ game, addGameState }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Flex flexDirection="column">
      <Flex flexDirection={['column', 'row']} alignItems="flex-start" justifyContent={[null, 'space-between']}>
        <Box>
          {game.title && (
            <Heading fontSize={5} color="black">
              <Text as="span" color="alternate">
                {game.title}
              </Text>
            </Heading>
          )}
          {game.type && (
            <Text fontSize={0}>
              This is a <strong>{game.type}</strong>
            </Text>
          )}
        </Box>
      </Flex>
      <Box width="100%">
        <Confetti active={addGameState ? addGameState.displayWaitMessage : false} config={confettiConfig} />
      </Box>
      <Flex flexDirection={['column', 'row-reverse']} my="2rem">
        <Box width={['100%', '50%']}>
          {game.image && <Image src={game.image} width={['300px', '400px', '500px']} />}
        </Box>
        <Flex flexDirection="column" width={['100%', '50%']} pr={[0, '1rem']}>
          <Box my="0.5rem">
            <Heading fontSize={2}>Title</Heading>
            <Text>{game.title ? game.title : 'No data found'}</Text>
          </Box>
          <Box my="0.5rem">
            <Heading fontSize={2}>BGG Rating</Heading>
            <Text>{game.bggRating ? game.bggRating : 'No data found'}</Text>
          </Box>
          <Box my="0.5rem">
            <Heading fontSize={2}>Difficulty (Weight)</Heading>
            <Flex alignItems="center">
              {game.difficulty ? (
                <>
                  <Text mr="0.5rem">{game.difficulty} / 5</Text>
                  <DifficultyBadge difficulty={game.difficulty} />
                </>
              ) : (
                'No data found'
              )}
            </Flex>
          </Box>
          <Box my="0.5rem">
            <Heading fontSize={2}>Players</Heading>
            {game.minPlayers && game.maxPlayers ? (
              <Text>
                {game.minPlayers === game.maxPlayers ? game.minPlayers : `${game.minPlayers}-${game.maxPlayers}`}
              </Text>
            ) : (
              <Text>No data found</Text>
            )}
          </Box>
          <Box my="0.5rem">
            <Heading fontSize={2}>Playing Time (min)</Heading>
            {game.minPlayingTime && game.maxPlayingTime ? (
              <Text>
                {game.minPlayingTime === game.maxPlayingTime
                  ? game.maxPlayingTime
                  : `${game.minPlayingTime}-${game.maxPlayingTime}`}
              </Text>
            ) : (
              <Text>No data found</Text>
            )}
          </Box>
          <Box my="0.5rem">
            <Heading fontSize={2}>Categories</Heading>
            <Text>{game.categories ? game.categories.join(', ') : 'No data found'}</Text>
          </Box>
          <Box my="0.5rem">
            <Heading fontSize={2}>Mechanisms</Heading>
            <Text>{game.mechanisms ? game.mechanisms.join(', ') : 'No data found'}</Text>
          </Box>
          {game.bggId && game.type && (
            <Box my="0.5rem">
              <Heading fontSize={2}>Game ID</Heading>
              <Text>{game.bggId}</Text>
              <Text
                as="a"
                href={`https://boardgamegeek.com/boardgame/${game.bggId}`}
                target="_blank"
                rel="noreferrer noopener"
                color="alternate"
              >
                Link to BGG
              </Text>
            </Box>
          )}
        </Flex>
      </Flex>
      <Flex>
        {game.description && (
          <Box mt="1rem">
            <Heading fontSize={2}>Description</Heading>
            <Media.SmallOnly>
              <Text color="alternate" onClick={() => setShowDescription(!showDescription)}>
                {showDescription ? 'Hide' : 'View'} Description
              </Text>
              {showDescription && <Text>{game.description}</Text>}
            </Media.SmallOnly>
            <Media.NotSmall>
              <Text>{game.description}</Text>
            </Media.NotSmall>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

const confettiConfig = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: '150',
  dragFriction: 0.1,
  duration: 5000,
  delay: 0,
  width: '1rem',
  height: '1rem',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};
