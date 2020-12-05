import * as React from 'react';
import { Box, Flex, Heading, Image, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';

import { DifficultyBadge } from '../DifficultyBadge';
import { BoardGame } from '../../lib/models/Game';
import Link from 'next/link';

interface StatInfoProps {
  label: string;
  value: string | number | string[] | number[];
}

const StatInfo: React.FC<StatInfoProps> = ({ label, value }) => {
  const isArray = Array.isArray(value);
  const valueExists = isArray ? !!value[0] && !!value[1] : !!value;
  const valueLabel = isArray && valueExists ? `${value[0]}-${value[1]}` : value;

  const labelColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Stat>
      <StatLabel fontSize="xs" color={labelColor}>
        {label}
      </StatLabel>
      {valueExists ? (
        <StatNumber fontSize={{ base: 'md', md: '2xl' }}>{valueLabel}</StatNumber>
      ) : (
        <StatNumber>?</StatNumber>
      )}
    </Stat>
  );
};

export interface GameSummaryProps {
  game: BoardGame;
}

export const GameSummary: React.FC<GameSummaryProps> = ({ game }) => {
  const borderColor = useColorModeValue('gray.200', 'blue.800');
  return (
    <Box
      boxShadow="md"
      padding="1rem"
      marginBottom="1rem"
      borderColor={borderColor}
      borderWidth="2px"
      borderRadius="5px"
    >
      <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}>
        <Flex width={{ base: '100%', md: '50%' }} alignItems={{ base: 'flex-start', md: 'center' }}>
          <Image
            src={game.thumbnail}
            alt={`${game.title} thumbnail`}
            width="80px"
            display={{ base: 'none', md: 'block' }}
            marginRight={{ base: '0', md: '1rem' }}
          />
          <Flex flexDirection="column" marginBottom="0.25rem">
            <Link href={`/boardgames/${game.bggId}`}>
              <Heading size="md" as="a">
                {game.title}
              </Heading>
            </Link>
            <DifficultyBadge difficulty={game.difficulty} />
          </Flex>
        </Flex>
        <Flex
          width={{ base: '100%', md: '50%' }}
          alignItems={{ base: 'center', md: 'flex-end' }}
          justifyContent="space-between"
        >
          <StatInfo label="Rating" value={game.bggRating} />
          <StatInfo label="Difficulty" value={game.difficulty} />
          <StatInfo label="Players" value={[game.minPlayers, game.maxPlayers]} />
          <StatInfo label="Time (min)" value={[game.minPlayingTime, game.maxPlayingTime]} />
        </Flex>
      </Flex>
    </Box>
  );
};
