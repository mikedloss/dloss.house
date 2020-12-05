import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';

import { InspectedBoardGame, SearchedGame } from '../../lib/models/Game';
import { inspectedBoardGame } from '../../lib/fragments';

export const useInspectGame = (key: string | string[], game: SearchedGame) => {
  const { data, error, isFetching, refetch } = useQuery<InspectedBoardGame>(
    key,
    async () => {
      const { inspectedGame } = await request(
        '/api/graphql',
        gql`
          ${inspectedBoardGame}
          query inspectBoardGame($bggId: String!) {
            inspectedGame: inspectBoardGame(id: $bggId) {
              ...InspectedBoardGame
            }
          }
        `,
        {
          bggId: game.id,
        }
      );
      return inspectedGame;
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!game.id,
    }
  );

  return {
    inspectedGame: data,
    refresh: refetch,
    isLoading: isFetching || (!error && !data),
    isError: !!error,
    error,
  };
};
