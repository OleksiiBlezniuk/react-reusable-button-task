import { useState, FC } from 'react';
import cn from 'classnames';
import styles from './SearchForm.module.scss';
import { SearchIcon } from '../../icons/SearchIcon';
import { Loader } from '../Loader/Loader';

interface Props {
  loadMovies: (query: string) => void;
  isLoading: boolean;
}

export const SearchForm: FC<Props> = ({
  loadMovies,
  isLoading,
}) => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          loadMovies(query)
        }}
      >
        <button
          type='submit'
          className={styles.submitButton}
        >
          <div className={cn(styles.loader, {
            [styles.hidden]: !isLoading,
          })}>
            <Loader size={10} />
          </div>

          <div className={cn(styles.buttonContent, {
            [styles.hidden]: isLoading,
          })}>
            <div className={styles.leftIcon}>
              <SearchIcon />
            </div>

            Find
          </div>
        </button>

        <input
          type='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name='searchQuery'
          placeholder='Enter movie name here'
          className={styles.searchInput}
        />
      </form>
    </div>
  )
}

