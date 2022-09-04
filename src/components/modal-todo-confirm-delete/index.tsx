import {useRouter} from 'next/router';
import React, {FC} from 'react';

import API, {ITodo} from '@/api/network/todo';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import {Modal} from '@/core-ui/modal';

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

  const deletePost = () => {
    if (data?.id)
      API.deleteTodo(data?.id).then(() => {
        onConfirm?.();

        if (page == 'detail') {
          router.push(ROUTES.TODO);
        }
      });
  };

  if (!data) return null;

  return (
    <Modal
      className={styles['com-modal-todo-confirm-delete']}
      variant="center"
      open={open}
      onClose={() => onCancel?.()}
    >
      <Modal.Header>
        <h3 className="title">Are you sure you want to delete task: {data.name}</h3>
      </Modal.Header>

      <Modal.Footer>
        <div className="flex w-full gap-x-3 md:gap-x-5">
          <Button
            className="btn btn-cancel"
            // variant="outlined"
            // color="secondary"
            text="No"
            onClick={() => onCancel?.()}
            type="button"
          />
          <Button
            className="btn btn-create"
            variant="contained"
            // color="primary"
            text="Yes"
            type="submit"
            onClick={() => deletePost()}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTodoConfirmDelete;
