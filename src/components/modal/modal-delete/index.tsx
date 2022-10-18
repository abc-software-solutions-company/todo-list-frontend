import cls from 'classnames';
import React, {Dispatch, FC, SetStateAction} from 'react';

import Button from '@/core-ui/button';
import {Modal} from '@/core-ui/modal';
import {IListResponse} from '@/data/api/types/list.type';
import {ITaskResponse} from '@/data/api/types/task.type';

import useModalDelete from './hook';
import styles from './style.module.scss';

export interface IProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  data: ITaskResponse | IListResponse;
}

const ModalDelete: FC<IProps> = props => {
  const {modalOpen, data} = props;
  const {onClose, onClick} = useModalDelete(props);

  return (
    <>
      {modalOpen && (
        <Modal className={cls(styles['com-modal-todo-confirm-delete'], 'max-w-xl')} variant="center" open={modalOpen} onClose={onClose}>
          <Modal.Header>
            <h3 className="title">
              <span className="block text-center">Are you sure you want to delete list:</span>
              <i className="block text-center">{data.name}</i>
            </h3>
          </Modal.Header>
          <Modal.Footer>
            <div className="flex w-full gap-x-3 md:gap-x-4">
              <Button className="w-full" variant="outlined" color="primary" text="No" onClick={onClose} type="button" />
              <Button className="w-full" variant="contained" color="primary" text="Yes" type="submit" onClick={onClick} />
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalDelete;
