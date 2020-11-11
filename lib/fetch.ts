import fetch from 'unfetch';

interface ResponseError extends Error {
  status?: number;
  info?: any;
}

export const fetcher = async <T>(url): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as ResponseError;

    error.status = res.status;
    if (res.status === 404) {
      error.info = 'Not found';
    }
    throw error;
  }

  return res.json();
};
