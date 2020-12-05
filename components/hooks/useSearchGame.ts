import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';

import { SearchedGame } from '../../lib/models/Game';

export const useSearchGame = (key: string | string[], searchTerm: string) => {
  const { data, error, isFetching, refetch, ...other } = useQuery<SearchedGame[]>(
    key,
    async () => {
      const { searchedBoardGames } = await request(
        '/api/graphql',
        gql`
          query searchForBoardGame($name: String!) {
            searchedBoardGames: searchForBoardGame(name: $name) {
              id
              title
            }
          }
        `,
        {
          name: searchTerm,
        }
      );
      return searchedBoardGames;
    },
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    searchedBoardGames: data,
    refresh: refetch,
    count: data ? data.length : undefined,
    isLoading: isFetching || (!error && !data),
    isError: !!error,
    error,
  };
};
