import cls from 'classnames';
import React, {FC} from 'react';

import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';
import {ITodolistResponse} from '@/data/api/types/todolist.type';

import useModalDelete from './hook';

export interface IProps {
  data: ITodolistResponse;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ModalDeleteList: FC<IProps> = props => {
  const {open, data, onClose} = props;
  const {onClick} = useModalDelete(props);

  if (!open) return null;

  return (
    <Modal className={cls('max-w-xl')} variant="center" open={open} onClose={onClose}>
      <Modal.Body className="pt-6">
        <h3 className="break-all md:text-h3">
          <span className="block text-center">Are you sure you want to delete list:</span>
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

export default ModalDeleteList;
