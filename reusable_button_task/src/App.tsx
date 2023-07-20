import { useCallback, useEffect, useState } from 'react'
import { MoviesList } from './components/MoviesList/MoviesList';
import { Mode, RawMovie } from './typedefs';
import styles from './App.module.scss';
import { Header } from './components/Header/Header';
import { getMovies } from './api/Movies';

const App = () => {
  const [movies, setMovies] = useState<RawMovie[]>([]);
  const [favorites, setFavorites] = useState<RawMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listMode, setListMode] = useState(Mode.Search);
  const [errorMessage, setErrorMessage] = useState('');

  const loadMovies = useCallback(async (query: string) => {
    if (!query) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const movies = await getMovies(query);
  
      setMovies(movies);
      setIsLoading(false);
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const favouritesFromStorage = localStorage.getItem('favourites');

    if (favouritesFromStorage) {
      const parsedFavourites = JSON.parse(favouritesFromStorage) as RawMovie[];

      setFavorites(parsedFavourites);
    }
  }, []);

  const visibleMovies = listMode === Mode.Favourites
    ? favorites
    : movies;

  const toggleMode = useCallback(() => {
    setListMode((prevMode) => (
      prevMode === Mode.Search
        ? Mode.Favourites
        : Mode.Search
    ));
  }, [setListMode]);

  const addToFavourites = useCallback((movie: RawMovie) => {
    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      return;
    }

    setFavorites((prev) => {
      const newList = [...prev, movie]
      const stringifiedFavourites = JSON.stringify(newList);

      localStorage.setItem('favourites', stringifiedFavourites);

      return newList;
    });
  }, [favorites, setFavorites]);

  const removeFromFavourites = useCallback((movieId: string) => {
    setFavorites((prev) => {
      const newList = prev.filter((fav) => fav.imdbID !== movieId);
      const stringifiedFavourites = JSON.stringify(newList);

      localStorage.setItem('favourites', stringifiedFavourites);

      return newList;
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Movie search app
      </h1>

      <Header
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        loadMovies={loadMovies}
        isLoading={isLoading}
        toggleMode={toggleMode}
        mode={listMode}
        movies={movies}
        setMovies={setMovies}
      />

      <div>
        {errorMessage && (
          <p className={styles.errorMessage}>
            Failed to load movies:&nbsp;
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && (
          <MoviesList
            movies={visibleMovies}
            mode={listMode}
            addToFavourites={addToFavourites}
            removeFromFavourites={removeFromFavourites}
            favorites={favorites}
          />
        )}
      </div>
    </div>
  )
}

export default App
