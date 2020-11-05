import React from 'react';
import { Flex, Heading, Text, Divider, Skeleton } from '@chakra-ui/core';

import { useBoardGames } from '../components/hooks';
import { GameSummary } from '../components/GameSummary';

const BoardGamesPage: React.FC = () => {
  const { games, count, isLoading, isError, error } = useBoardGames();

  return (
    <>
      <Flex flexDirection="column">
        <Heading>Board Games</Heading>
        {isLoading ? (
          <Skeleton height="20px" />
        ) : (
          <>
            {!isError ? <Text>Showing all {count} games</Text> : null}
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
    </>
  );
};

export default BoardGamesPage;
