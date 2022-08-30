import React, {FC} from 'react';

import API, {ITodo} from '@/api/network/todo-list';
import {Modal} from '@/core-ui/modal';

interface IProps {
  data: ITodo;
  open: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const ModalDeletePost: FC<IProps> = ({data, open, onCancel, onConfirm}) => {
  const cancel = () => {
    onCancel?.();
  };

  const deletePost = () => {
    if (data?.id) API.deleteTodoList(data?.id).then(() => onConfirm?.());
  };

  if (!data) return null;

  return (
    <Modal open={open} onClose={onConfirm}>
      <Modal.Header>{'Delete Post'}</Modal.Header>
      <Modal.Body>
        <p>Xóa {data.listName}?</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={cancel}>
          Cancel
        </button>
        <button type="button" onClick={deletePost}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeletePost;
