import {useRouter} from 'next/router';
import {FC, useState} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';

import LobbyDecor from '../common/vector/lobby-decor';
import ModalCreateUpdateList from '../modal/modal-create-update-list';
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
                <Button variant="contained" className="w-full py-3 font-medium" color="info" onClick={() => setModalOpen(true)} text=" Create New List" />
              </div>
              <Button variant="contained" className="w-full py-3 font-medium" color="info" onClick={() => router.push(ROUTES.LIST)} text="My List" />
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
