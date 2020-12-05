import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Center, Flex, Heading, Spinner, Text, Fade } from '@chakra-ui/react';
import { gql } from 'graphql-request';

import { NotFound } from '../../components/NotFound';
import { BoardGame } from '../../lib/models/Game';
import { useBoardGame } from '../../components/hooks';
import { GameProfile } from '../../components/GameProfile';

export interface SingleBoardGamePageProps {
  game: BoardGame;
}

const query = gql`
  query getBoardGame($bggId: String!) {
    boardGame: getBoardGame(id: $bggId) {
      bggId
      title
      type
      image
      bggRating
      bggRank
      difficulty
      minPlayers
      maxPlayers
      minPlayingTime
      maxPlayingTime
      categories
      mechanisms
      description
    }
  }
`;

const SingleBoardGamePage: React.FC<SingleBoardGamePageProps> = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { games, count, isLoading, isError, error } = useBoardGame(['boardgame', id], query, { bggId: id });

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
