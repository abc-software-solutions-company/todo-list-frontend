import React from 'react';
import API from '@/api/network/task';
import Button from '@/core-ui/button';
import Modal from '@/core-ui/modal';

import styles from './style.module.scss';
import useToast from '@/core-ui/toast';

interface IProps {
  open: boolean;
  onClose?: () => void;
  taskId?: string;
  taskName?: string;
}

const ModalDeleteTask: React.FC<IProps> = ({taskId, taskName, open, onClose}) => {
  const toast = useToast();

  const handleDelete = (taskId: string, event: React.FormEvent<HTMLFormElement>) => {
    API.deleteTask(taskId).then(res => {
      if (res.status == 200) {
        toast.show({type: 'success', title: '', content: `You have deleted ${taskName}`, lifeTime: 7000});
      }
    });
    event.preventDefault();
  };

  if (!taskId) return null;

  return (
    <div className={styles['com-modal-delete-task']}>
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <h3 className="heading">Are you sure you want to delete task: {taskName}</h3>
        </Modal.Header>

        <form onSubmit={event => handleDelete(taskId, event)}>
          <Modal.Footer>
            <Button className="btn" text="No" onClick={onClose} />
            <Button className="btn" text="Yes" type="submit" onClick={onClose} />
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalDeleteTask;
