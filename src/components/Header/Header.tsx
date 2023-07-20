import { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import { SearchForm } from '../SearchForm/SearchForm';
import styles from './Header.module.scss';
import { CrossIcon } from '../../icons/CrossIcon';
import { Mode, RawMovie } from '../../typedefs';

interface Props {
  loadMovies: (query: string) => void;
  isLoading: boolean;
  mode: Mode;
  toggleMode: () => void;
  movies: RawMovie[];
  setMovies: Dispatch<SetStateAction<RawMovie[]>>;
}

export const Header: FC<Props> = ({
  loadMovies,
  isLoading,
  mode,
  toggleMode,
  movies,
  setMovies,
}) => {
  const modeButtonText = mode === Mode.Search
    ? 'Show favourites'
    : 'Show search results';

  const isListEmpty = !movies.length;
  
  return (
    <header className={styles.header}>
      <SearchForm
        loadMovies={loadMovies}
        isLoading={isLoading}
      />

      <div className={styles.controls}>
        <button
          type='button'
          className={cn(styles.clearButton, {
            [styles.disabled]: isListEmpty,
          })}
          disabled={isListEmpty}
          onClick={() => setMovies([])}
        >
          Clear results

          <div className={styles.rightIcon}>
            <CrossIcon />
          </div>
        </button>

        <button
          type='button'
          className={styles.favouritesButton}
          onClick={toggleMode}
        >
          {modeButtonText}
        </button>
      </div>
    </header>
  )
}
