import Button from '../../core-ui/button';
import Modal from '../../core-ui/modal';
import React from 'react';

import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose?: () => void;
}

const ModalCreateList: React.FC<IProps> = ({open, onClose}) => {
  return (
    <div className={styles['com-modal-create-list']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Create New list</h3>
        </Modal.Header>
        <Modal.Body>
          <input className="input" type="text" placeholder="Enter your list" />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn" text="Cancel" onClick={onClose} theme="white" />
          <Button className="btn" text="Create" />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCreateList;
