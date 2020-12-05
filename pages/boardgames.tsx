import * as React from 'react';
import { Flex, Heading, Text, Divider, Skeleton, IconButton } from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';

import { useBoardGames } from '../components/hooks';
import { GameSummary } from '../components/GameSummary';

const BoardGamesPage: React.FC = () => {
  const { games, count, isLoading, isError, error, refresh } = useBoardGames();

  return (
    <Flex flexDirection="column">
      <Heading>Board Games</Heading>
      {isLoading ? (
        <Skeleton height="20px" />
      ) : (
        <>
          {!isError ? (
            <Flex alignItems="center">
              <IconButton
                aria-label="refresh list"
                icon={<FiRefreshCw />}
                size="xs"
                marginRight="0.5rem"
                onClick={() => refresh()}
              />
              <Text>Showing all {count} games</Text>
            </Flex>
          ) : null}
          <Divider marginY="1rem" />
          {isError ? (
            <Flex flexDirection="column">
              <Text color="orange.500">Something went wrong!</Text>
              <Text color="red.500">{error.info}</Text>
            </Flex>
          ) : (
            games.map((game) => {
              return <GameSummary key={game.bggId} game={game} />;
            })
          )}
        </>
      )}
    </Flex>
  );
};

export default BoardGamesPage;
