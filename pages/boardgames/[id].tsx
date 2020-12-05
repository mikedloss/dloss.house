import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Center, Flex, Heading, Spinner, Text, Fade } from '@chakra-ui/react';
import { gql } from 'graphql-request';

import { NotFound } from '../../components/NotFound';
import { BoardGame } from '../../lib/models/Game';
import { useBoardGame } from '../../components/hooks';
import { GameProfile } from '../../components/GameProfile';
import { fullBoardGame } from '../../lib/fragments';

export interface SingleBoardGamePageProps {
  game: BoardGame;
}

const query = gql`
  ${fullBoardGame}
  query getBoardGame($bggId: String!) {
    boardGame: getBoardGame(id: $bggId) {
      ...FullBoardGame
    }
  }
`;

const SingleBoardGamePage: React.FC<SingleBoardGamePageProps> = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { game, isLoading, isError, error } = useBoardGame(['boardgame', id], query, { bggId: id });

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
      ) : isError ? (
        <NotFound>
          <Heading>Not found!</Heading>
          <Text>No game was found with ID {router.query.id}</Text>
        </NotFound>
      ) : (
        <GameProfile game={game} />
      )}
    </>
  );
};

export default SingleBoardGamePage;
