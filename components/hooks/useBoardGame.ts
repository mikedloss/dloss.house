import { useQuery } from 'react-query';
import { request } from 'graphql-request';

import { BoardGame } from '../../lib/models/Game';

export const useBoardGame = (key: string | string[], gql: string, variables: Record<string, any>) => {
  const { data, error, isFetching, refetch } = useQuery<BoardGame[], any>(
    key,
    async () => {
      const { boardGame } = await request('/api/graphql', gql, variables);
      return boardGame;
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
