import useSWR from 'swr';

export const useBoardGames = () => {
  const { data, error } = useSWR('/api/boardgames/all');

  return {
    games: data,
    count: data ? data.length : undefined,
    isLoading: !error && !data,
    isError: !!error,
    error,
  };
};
