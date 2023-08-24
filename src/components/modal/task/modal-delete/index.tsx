import cls from 'classnames';
import React, {FC} from 'react';

import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';
import {ITaskResponse} from '@/data/api/types/task.type';

import useModalDelete from './hook';

export interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  data: ITaskResponse;
}

const ModalDeleteTask: FC<IProps> = props => {
  const {open, onClose, data} = props;
  const {onClick} = useModalDelete(props);

  if (!open) return null;

  return (
    <Modal className={cls('max-w-xl')} variant="center" open={open} onClose={onClose}>
      <Modal.Body className="pt-6">
        <h3 className="break-all md:text-h3">
          <span className="block text-center">Are you sure you want to delete task:</span>
          <i className="block text-center">{data.name}</i>
        </h3>
      </Modal.Body>
      <Modal.Footer>
        <div className="content">
          <Button className="w-full" variant="outlined" color="primary" text="No" onClick={onClose} type="button" />
          <Button className="w-full" variant="contained" color="primary" text="Yes" type="submit" onClick={onClick} />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteTask;
