import React, {FC} from 'react';
import API, {ITodo} from '@/api/network/todo-list';
import {Modal} from '@/core-ui/modal';
import {useRouter} from 'next/router';

import styles from './style.module.scss';

interface IProps {
  data: ITodo;
  open: boolean;
  page?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const ModalTodoConfirmDelete: FC<IProps> = ({data, open, page, onCancel, onConfirm}) => {
  const router = useRouter();

  const cancel = () => {
    onCancel?.();
  };

  const deletePost = () => {
    if (data?.id)
      API.deleteTodoList(data?.id).then(() => {
        onConfirm?.();

        if (page == 'detail') {
          router.push('/list');
        }
      });
  };

  if (!data) return null;

  return (
    <div className={styles['com-modal-todo-confirm-delete']}>
      <Modal open={open} onClose={onConfirm}>
        {/* <Modal.Header>{'Delete Post'}</Modal.Header> */}
        <Modal.Body>
          <h3 className="title">Are you sure you want to delete list {data.listName}?</h3>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-cancel" type="button" onClick={cancel}>
            Cancel
          </button>
          <button className="btn btn-delete" type="button" onClick={deletePost}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalTodoConfirmDelete;
