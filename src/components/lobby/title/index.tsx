import {FC} from 'react';

import {LobbyTexts} from '@/utils/constant';

import styles from './style.module.scss';

const LobbyTitle: FC = () => {
  return (
    <>
      <p className={styles.title}>{LobbyTexts.TITLE}</p>
      <p className={styles.headline}>{LobbyTexts.HEADLINE}</p>
      <p className={styles.quote}>{LobbyTexts.QUOTE}</p>
    </>
  );
};

export default LobbyTitle;
