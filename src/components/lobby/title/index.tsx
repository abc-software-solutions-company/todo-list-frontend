import {FC} from 'react';

import styles from './style.module.scss';

const LobbyTitle: FC = () => {
  return (
    <>
      <p className={styles.title}>TO-DO LIST</p>
      <p className={styles.h1}>Organize your work and life, finally.</p>
    </>
  );
};

export default LobbyTitle;
