import { FC } from 'react';
import { Mode, RawMovie } from '../../typedefs';
import styles from './MoviesList.module.scss';
import { MovieItem } from './components/MovieItem';

interface Props {
  movies: RawMovie[];
  mode: Mode;
  addToFavourites: (movie: RawMovie) => void;
  removeFromFavourites: (movieId: string) => void;
  favorites: RawMovie[];
}

export const MoviesList: FC<Props> = ({
  movies,
  mode,
  addToFavourites,
  removeFromFavourites,
  favorites,
}) => {
  return (
    <div className={styles.listWrapper}>
      <h2 className={styles.title}>
        {mode === Mode.Favourites
          ? 'Favourites:'
          : 'Search results:'
        }
      </h2>

      {!movies.length
        ? (
          <p className={styles.emptyListMessage}>
            Movies list is empty.

            {mode === Mode.Favourites
              ? ' Find some movies and add them to your favourites'
              : ' Try searching for some movies'
            }
          </p>
        )
        : (
          <ul className={styles.movieList}>
            {movies.map((movie) => (
              <li
                key={movie.imdbID}
                className={styles.movieCard}
              >
                <MovieItem
                  movie={movie}
                  addToFavourites={addToFavourites}
                  removeFromFavourites={removeFromFavourites}
                  isFavourite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                />
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
};

