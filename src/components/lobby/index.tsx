import {FC, useState} from 'react';

import Button from '@/core-ui/button';
import Input from '@/core-ui/input';

import LobbyDecor from '../common/vector/lobby-decor';
import ModalCreateUpdateList from '../modal/modal-create-update-list';
import useLobbyHook from './hook';
import styles from './style.module.scss';
import LobbyTitle from './title';

const Lobby: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const {onSubmit, register, formState} = useLobbyHook();
  const {errors, isSubmitting} = formState;
  return (
    <>
      <div className={styles['page-lobby']}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <LobbyTitle />
            <div className={styles.actions}>
              <div className="item">
                <Button variant="contained" className="h-full w-full font-medium" color="info" onClick={() => setModalOpen(true)} text=" Create New List" />
              </div>
              <form onSubmit={onSubmit}>
                <Input
                  groupEnd={<Button className="px-5 font-medium" color="info" variant="contained" text="Join" type="submit" disabled={isSubmitting} />}
                  placeholder="Enter Link or ID"
                  error={errors.idOrLink?.message}
                  {...register('idOrLink')}
                />
              </form>
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
