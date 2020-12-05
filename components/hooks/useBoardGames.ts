import useSWR from 'swr';

import { BoardGame } from '../../lib/models/Game';
import { fetcher } from '../../lib/fetch';

export const useBoardGames = (bggId?: string) => {
  let url = '';
  if (bggId) {
    url = `/api/boardgames/${bggId}`;
  } else {
    url = `/api/boardgames/all`;
  }
  const { data, error, mutate, isValidating } = useSWR<BoardGame[]>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // console.log(`isValidating`, isValidating);

  return {
    games: data,
    refresh: mutate,
    count: data ? data.length : undefined,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
};
