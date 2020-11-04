import React from 'react';
import { Flex, Heading, Text, Divider, Skeleton } from '@chakra-ui/core';

import { useBoardGames } from '../components/hooks';

const BoardGamesPage: React.FC = () => {
  const { games, count, isLoading, isError, error } = useBoardGames();

  console.log(`isLoading`, isLoading);

  return (
    <>
      <Flex flexDirection="column">
        <Heading>Board Games</Heading>
        <Skeleton isLoaded={!isLoading}>
          <Text>Showing all {count} games</Text>
          <Divider marginY="1rem" />
          <span>games go here</span>
        </Skeleton>
      </Flex>
    </>
  );
};

export default BoardGamesPage;
