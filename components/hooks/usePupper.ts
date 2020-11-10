import useSWR from 'swr';

export const usePupper = () => {
  const { data, error } = useSWR('https://dog.ceo/api/breeds/image/random');

  return {
    url: data?.message,
    error,
    isLoading: !error && !data,
  };
};
