import cls from 'classnames';
import React, {FC} from 'react';

import Button from '@/core-ui/button';
import {Modal} from '@/core-ui/modal';
import {ITodolistResponse} from '@/data/api/types/list.type';
import {ITaskResponse} from '@/data/api/types/task.type';

import useModalDelete from './hook';
import styles from './style.module.scss';

export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  data: ITaskResponse | ITodolistResponse;
}

const ModalDelete: FC<IProps> = props => {
  const {open, onClose, data} = props;
  const {onClick} = useModalDelete(props);

  return (
    <>
      {open && (
        <Modal className={cls(styles['com-modal-todo-confirm-delete'], 'max-w-xl')} variant="center" open={open} onClose={onClose}>
          <Modal.Header>
            <h3 className="title">
              <span className="block text-center">Are you sure you want to delete {`${(data as any).todolistId ? 'task' : 'list'}`}:</span>
              <i className="block text-center">{data.name}</i>
            </h3>
          </Modal.Header>
          <Modal.Footer>
            <div className="content">
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
