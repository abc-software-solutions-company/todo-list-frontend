import {useRouter} from 'next/router';
import {FC} from 'react';

import LobbyDecor from '@/components/common/vector/lobby-decor';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import useModals from '@/states/modals/use-modals';
import {LobbyTexts} from '@/utils/constant';

import styles from './style.module.scss';
import LobbyTitle from './title';

const Lobby: FC = () => {
  const router = useRouter();

  const {setIsOpenModal} = useModals();

  const onNew = () => setIsOpenModal('createList');

  return (
    <div className={styles['page-lobby']}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <LobbyTitle />
          <div className={styles.actions}>
            <div className="item">
              <Button
                variant="contained"
                className={styles.button}
                color="info"
                onClick={onNew}
                text={LobbyTexts.CREATE}
              />
            </div>
            <Button
              variant="contained"
              className={styles.button}
              color="info"
              onClick={() => router.push(ROUTES.LIST)}
              text={LobbyTexts.MY_LISTS}
            />
          </div>
        </div>
        <div className={styles.decor}>
          <LobbyDecor />
        </div>
      </div>
    </div>
  );
};
export default Lobby;
