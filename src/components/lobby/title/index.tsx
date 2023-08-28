import {FC} from 'react';

import {LobbyTexts} from '@/utils/constant';

import styles from './style.module.scss';

const LobbyTitle: FC = () => {
  return (
    <div className={styles['lobby-title']}>
      <p className={styles.title} data-testid="lobby-title">
        {LobbyTexts.TITLE}
      </p>
      <p className={styles.headline}>{LobbyTexts.HEADLINE}</p>
      <p className={styles.quote}>{LobbyTexts.QUOTE}</p>
    </div>
  );
};

export default LobbyTitle;
