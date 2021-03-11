import * as React from 'react';
import { Flex, Heading, Text, Divider, Skeleton, IconButton, Button, Box } from '@chakra-ui/react';
import { FiRefreshCw } from 'react-icons/fi';
import { gql } from 'graphql-request';

import { useBoardGames } from '../components/hooks';
import { GameSummary } from '../components/GameSummary';
import Link from 'next/link';

const query = gql`
  query {
    boardGames: getBoardGames {
      bggId
      title
      thumbnail
      difficulty
      bggRating
      minPlayers
      maxPlayers
      minPlayingTime
      maxPlayingTime
    }
  }
`;

const BoardGamesPage: React.FC = () => {
  const { games, count, isLoading, isError, error, refresh } = useBoardGames('boardgames', query);

  return (
    <Flex flexDirection="column">
      <Heading>Board Games</Heading>
      {isLoading ? (
        <Skeleton height="20px" />
      ) : (
        <>
          {!isError ? (
            <Flex alignItems="center" justifyContent="space-between">
              <Flex>
                <IconButton
                  aria-label="refresh list"
                  icon={<FiRefreshCw />}
                  size="xs"
                  marginRight="0.5rem"
                  onClick={() => refresh()}
                />
                <Text>Showing all {count} games</Text>
              </Flex>
              {/* <Link href="boardgames/search">
                <Button>Search</Button>
              </Link> */}
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
