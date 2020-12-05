import { useQuery } from 'react-query';
import { fetcher } from '../../lib/fetch';

export const usePupper = () => {
  const { data, error } = useQuery<any, any>('pupper', async () => {
    const data = await fetcher<{ message: string; status: string }>('https://dog.ceo/api/breeds/image/random');
    if (data.status === 'success') {
      return data.message;
    }
    return null;
  });

  return {
    url: data,
    error,
    isLoading: !error && !data,
  };
};
