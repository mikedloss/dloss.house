import { useQuery } from 'react-query';
import { request } from 'graphql-request';

import { BoardGame } from '../../lib/models/Game';

export const useBoardGames = (key: string | string[], gql: string) => {
  const { data, error, isFetching, refetch } = useQuery<BoardGame[], any>(
    key,
    async () => {
      const { boardGames } = await request('/api/graphql', gql);
      return boardGames;
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    games: data,
    refresh: refetch,
    count: data ? data.length : undefined,
    isLoading: isFetching || (!error && !data),
    isError: !!error,
    error,
  };
};
