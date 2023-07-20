import { ApiResponse, RawMovie } from '../typedefs';

export const API_KEY = 'e78a8bc0';
export const API_URL = 'http://www.omdbapi.com/';

export const getMovies = async (
  query: string,
): Promise<RawMovie[]> => {
  const response = await fetch(`${API_URL}/?s=${query}&apikey=${API_KEY}&page=1`);

  const data = await response.json() as ApiResponse;

  if (data.Response === 'False') {
    throw new Error(data.Error || 'Something went wrong');
  }

  return data.Search || [];
};
