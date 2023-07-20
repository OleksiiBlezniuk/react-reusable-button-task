import { FC, useCallback } from 'react';
import cn from 'classnames';
import { RawMovie } from '../../../typedefs';
import styles from './MovieItem.module.scss';
import { HeartIcon } from '../../../icons/HeartIcon';

interface Props {
  movie: RawMovie;
  isFavourite: boolean;
  addToFavourites: (movie: RawMovie) => void;
  removeFromFavourites: (movieId: string) => void;
}

export const MovieItem: FC<Props> = ({
  movie,
  isFavourite,
  addToFavourites,
  removeFromFavourites,
}) => {
  const {
    Title,
    Year,
    Poster,
    Type,
  } = movie;

  const favouritesButtonText = isFavourite
    ? 'Remove'
    : 'Add';

  const handleClick = useCallback(() => {
    if (isFavourite) {
      return removeFromFavourites(movie.imdbID);
    }

    return addToFavourites(movie);
  }, [addToFavourites, removeFromFavourites, isFavourite, movie]);

  return (
    <>
      <div>
        <img
          className={styles.moviePoster}
          src={Poster}
          alt={Title}
        />
        <h3 className={styles.movieTitle}>
          {Title}
        </h3>
      </div>

      <div>
        <div className={styles.movieInfo}>
          <p className={styles.movieYear}>
            Released:&nbsp;
            {Year}
          </p>
          <p
            className={cn(styles.movieType, {
              [styles[Type]]: true,
            })}
          >
            {movie.Type}
          </p>
        </div>

        <button
          type='button'
          className={cn(styles.favouritesButton, {
            [styles.favouritesButtonActive]: isFavourite,
          })}
          onClick={handleClick}
        >
          {favouritesButtonText}

          <div className={styles.rightIcon}>
            <HeartIcon />
          </div>
        </button>
      </div>
    </>
  )
};

