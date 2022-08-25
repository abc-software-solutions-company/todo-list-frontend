import React from 'react';
import API from '@/api/network/task';
import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';

import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose?: () => void;
  taskId?: string;
  taskName?: string;
}

const ModalDeleteTask: React.FC<IProps> = ({taskId, taskName, open, onClose}) => {
  const handleDelete = (taskId: string) => {
    API.deleteTask(taskId).then(res => {
      if (res.status == 200) {
        alert(`You have deleted ${taskName}`);
        window.location.reload();
      }
    });
  };

  if (!taskId) return null;

  return (
    <div className={styles['com-modal-delete-task']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Are you sure you want to delete task: {taskName}</h3>
        </Modal.Header>

        <Modal.Footer>
          <Button className="btn" text="No" onClick={onClose} theme="white" />
          <Button className="btn" text="Yes" onClick={() => handleDelete(taskId)} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalDeleteTask;
