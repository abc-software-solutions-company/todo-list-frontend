import {FC} from 'react';

import ModalTodoAddEdit from '@/components/modal-list-add-edit';
import Button from '@/core-ui/button';
import Input from '@/core-ui/input';

import LobbyTitle from '../lobby-title';
import useLobbyHook from './hook';
import styles from './style.module.scss';

const Lobby: FC = () => {
  const {action, errors, handleSubmit, onSubmit, register, reset, setAction, formState, resetAction} = useLobbyHook();
  return (
    <>
      <div className={styles['page-action']}>
        <div className="container">
          <div className="inner">
            <LobbyTitle />
            <div className="actions">
              <div className="item">
                <Button
                  variant="contained"
                  className="w-full font-medium"
                  color="primary"
                  onClick={() => setAction({type: 'add', payload: null})}
                  text=" Create New List"
                />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  groupEnd={
                    <Button
                      className="px-5 font-medium "
                      color="primary"
                      variant="contained"
                      text="Join"
                      type="submit"
                      disabled={formState.isSubmitting}
                    />
                  }
                  placeholder="Enter Link or ID"
                  error={errors.listId?.message}
                  {...register('listId')}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      {['add'].includes(action.type) && (
        <ModalTodoAddEdit data={action.payload} open={true} onSave={() => reset()} onCancel={resetAction} />
      )}
    </>
  );
};
export default Lobby;
