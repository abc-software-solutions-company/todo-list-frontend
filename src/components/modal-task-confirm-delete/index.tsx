import {FC} from 'react';
import {Modal} from '@/core-ui/modal';
import TaskAPI from '@/api/network/task';

import styles from './style.module.scss';

interface IProps {
  data?: any;
  open: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ModalTaskConfirmDelete: FC<IProps> = ({data, open, onCancel, onConfirm}) => {
  console.log(data);

  const deletePost = () => {
    if (data?.id) TaskAPI.deleteTask(data?.id).then(() => onConfirm?.());
  };

  return (
    <div className={styles['com-modal-task-confirm-delete']}>
      <Modal open={open} onClose={onCancel}>
        {/* <Modal.Header>Delete task</Modal.Header> */}
        <Modal.Body>
          <h3 className="title">Are you sure you want to delete task {data.taskName}</h3>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-cancel" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="btn btn-delete" onClick={deletePost} type="button">
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalTaskConfirmDelete;
