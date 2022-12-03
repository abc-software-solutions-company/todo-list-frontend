import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import LobbyDecor from '@/components/common/vector/lobby-decor';
import ModalCreateUpdateList from '@/components/modal/modal-create-update-list';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import {LobbyTexts} from '@/utils/constant';

import styles from './style.module.scss';
import LobbyTitle from './title';

const Lobby: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className={styles['page-lobby']}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <LobbyTitle />
            <div className={styles.actions}>
              <div className="item">
                <Button variant="contained" className={styles.button} color="info" onClick={() => setModalOpen(true)} text={LobbyTexts.CREATE} />
              </div>
              <Button variant="contained" className={styles.button} color="info" onClick={() => router.push(ROUTES.LIST)} text={LobbyTexts.MY_LISTS} />
            </div>
          </div>
          <div className={styles.decor}>
            <LobbyDecor />
          </div>
        </div>
      </div>
      {<ModalCreateUpdateList open={modalOpen} onClose={() => setModalOpen(false)} />}
    </>
  );
};
export default Lobby;
