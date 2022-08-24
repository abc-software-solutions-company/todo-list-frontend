import React from 'react';

import Button from '@/core-ui/button';

import Modal from '../../core-ui/modal';
import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose?: () => void;
}

const ModalDeleteList: React.FC<IProps> = ({open, onClose}) => {
  return (
    <div className={styles['com-modal-delete-list']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Are you sure you want to delete list Shopping</h3>
        </Modal.Header>
        <Modal.Footer>
          <Button className="btn" text="No" onClick={onClose} theme="white" />
          <Button className="btn" text="Yes" />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalDeleteList;
