import { useMutation } from 'react-query';
import { request, gql } from 'graphql-request';

import { InspectedBoardGame } from '../../lib/models/Game';
import { inspectedBoardGame } from '../../lib/fragments';

export const useAddGame = () => {
  const [mutate, { data, error, reset, isLoading, isSuccess, isError }] = useMutation<
    boolean,
    unknown,
    InspectedBoardGame
  >(async (game) => {
    delete game.alreadyExists;
    const res = await request(
      `/api/graphql`,
      gql`
        mutation addGame($game: InputBoardGame) {
          addedGame: addGame(game: $game) {
            bggId
          }
        }
      `,
      {
        game,
      }
    );
    return !!res;
  });

  return {
    mutate,
    data,
    error,
    reset,
    isLoading,
    isSuccess,
    isError,
  };
};
