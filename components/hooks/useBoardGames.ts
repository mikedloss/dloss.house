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
  const { data, error } = useSWR<BoardGame[]>(url, fetcher);

  return {
    games: data,
    count: data ? data.length : undefined,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
};
