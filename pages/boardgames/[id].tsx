import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Center, Flex, Heading, Skeleton, Spinner, Text, Fade } from '@chakra-ui/core';

import { NotFound } from '../../components/NotFound';
import { BoardGame } from '../../lib/models/Game';
import { useBoardGames } from '../../components/hooks';
import { GameProfile } from '../../components/GameProfile';

export interface SingleBoardGamePageProps {
  game: BoardGame;
}

const SingleBoardGamePage: React.FC<SingleBoardGamePageProps> = () => {
  const router = useRouter();
  const { games, count, isLoading, isError, error } = useBoardGames(router.query.id as string);

  return (
    <>
      {isLoading ? (
        <Fade in={isLoading}>
          <Center height="100vh">
            <Flex alignItems="center">
              <Spinner size="xl" />
              <Heading marginLeft="1rem">Loading...</Heading>
            </Flex>
          </Center>
        </Fade>
      ) : isError || count === 0 ? (
        <NotFound>
          <Heading>Not found!</Heading>
          <Text>No game was found with ID {router.query.id}</Text>
        </NotFound>
      ) : (
        <>
          {count > 1 ? <Heading>More than 1 game</Heading> : null}
          <GameProfile game={games[0]} />
        </>
      )}
    </>
  );
};

export default SingleBoardGamePage;
