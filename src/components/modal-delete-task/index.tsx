import React from 'react';

import API from '@/api/network/task';
import Button from '@/core-ui/button';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';

import styles from './style.module.scss';

interface IProps {
  open: boolean;
  onClose: () => void;
  taskId?: string;
  taskName?: string;
  fetchData?: () => void;
}

const ModalDeleteTask: React.FC<IProps> = ({taskId, taskName, open, onClose, fetchData}) => {
  const toast = useToast();

  const handleDelete = (taskId: string, event: React.FormEvent<HTMLFormElement>) => {
    API.deleteTask(taskId).then(res => {
      if (res.status == 200) {
        toast.show({type: 'danger', title: '', content: `You have deleted task: ${taskName}!`, lifeTime: 5000});
        fetchData?.();
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
