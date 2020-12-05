import * as React from 'react';
import { Box, Button, Collapse, Flex, Heading, Image, Link, Text, useDisclosure } from '@chakra-ui/react';
import { BoardGame } from '../../lib/models/Game';
import { DifficultyBadge } from '../DifficultyBadge';

interface GamePropertyProps {
  label: string;
  value?: string | number;
}

const GameProperty: React.FC<GamePropertyProps> = ({ label, value, children }) => {
  return (
    <Flex flexDirection="column" marginY="0.5rem">
      <Text as="span" fontSize="sm" fontWeight="bold">
        {label}
      </Text>
      {children ? <>{children}</> : <Text fontSize="xl">{value || 'No data found'}</Text>}
    </Flex>
  );
};

export interface GameProfileProps {
  game: BoardGame;
}

export const GameProfile: React.FC<GameProfileProps> = ({ game }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" marginBottom="2rem">
        <Heading>{game.title}</Heading>
        {game.type && (
          <Text fontSize="sm">
            This is a{' '}
            <Text as="span" fontSize="sm" fontWeight="bold">
              {game.type}
            </Text>
          </Text>
        )}
      </Flex>

      <Flex flexDirection={{ base: 'column', md: 'row-reverse' }}>
        {game.image && (
          <Box width={{ base: '100%', md: '50%' }}>
            <Image src={game.image} width={{ base: '300px', sm: '400px', md: '500px' }} />
          </Box>
        )}
        <Flex flexDirection="column" width={{ base: '100%', md: '50%' }}>
          <GameProperty label="BGG Rating" value={game.bggRating} />
          <GameProperty label="BGG Rank" value={game.bggRank && `#${game.bggRank}`} />
          <GameProperty label="Difficulty (Weight)">
            <Flex alignItems="center">
              <Text fontSize="xl" mr="0.5rem">
                {game.difficulty} / 5
              </Text>
              <DifficultyBadge difficulty={game.difficulty} />
            </Flex>
          </GameProperty>
          <GameProperty
            label="Players"
            value={
              game.minPlayers && game.maxPlayers
                ? game.minPlayers === game.maxPlayers
                  ? game.minPlayers
                  : game.players
                : null
            }
          />
          <GameProperty
            label="Playing Time (minutes)"
            value={
              game.minPlayingTime && game.maxPlayingTime
                ? game.minPlayingTime === game.maxPlayingTime
                  ? game.minPlayingTime
                  : game.playingTime
                : null
            }
          />
          <GameProperty label="Categories" value={game.categories ? game.categories.join(', ') : null} />
          <GameProperty label="Mechanisms" value={game.mechanisms ? game.mechanisms.join(', ') : null} />
          <GameProperty label="Game ID">
            <Flex flexDirection="column" alignItems="flex-start">
              <Text fontSize="xl">{game.bggId}</Text>
              <Link
                minWidth="0"
                href={`https://boardgamegeek.com/boardgame/${game.bggId}`}
                target="_blank"
                rel="noreferrer noopener"
                color="blue.500"
              >
                View on BGG
              </Link>
            </Flex>
          </GameProperty>
        </Flex>
      </Flex>
      {game.description && (
        <GameProperty label="Description">
          <Box>
            <Button onClick={onToggle} size="sm">
              Show Description
            </Button>
            <Collapse in={isOpen} animateOpacity>
              <Box margin="1rem">
                <Text>{game.description}</Text>
              </Box>
            </Collapse>
          </Box>
        </GameProperty>
      )}
    </Flex>
  );
};
