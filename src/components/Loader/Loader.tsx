import { FC } from 'react';
import styles from './Loader.module.scss';

interface Props {
  size?: number;
}

export const Loader: FC<Props> = ({
  size = 24,
}) => (
  <div className={styles.loader}>
    <div
      style={{ fontSize: `${size}px` }}
      className={styles.loader__content}
    />
  </div>
);
