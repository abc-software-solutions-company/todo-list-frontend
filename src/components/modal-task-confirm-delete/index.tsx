import cls from 'classnames';
import {useRouter} from 'next/router';
import {FC} from 'react';

import TaskAPI, {ITask} from '@/api/network/task';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import {Modal} from '@/core-ui/modal';

import styles from './style.module.scss';

interface IProps {
  data?: ITask;
  open: boolean;
  page?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ModalTaskConfirmDelete: FC<IProps> = ({data, open, page, onCancel, onConfirm}) => {
  const router = useRouter();

  const deletePost = () => {
    if (data?.id)
      TaskAPI.deleteTask(data?.id).then(() => {
        onConfirm?.();

        if (page === 'detail') {
          router.push(ROUTES.TODO_LIST);
        }
      });
  };

  if (!data) return null;

  return (
    <Modal
      className={cls(styles['com-modal-task-confirm-delete'], 'max-w-3xl')}
      variant="center"
      open={open}
      onClose={() => onCancel?.()}
    >
      <Modal.Header>
        <h3 className="title">Are you sure you want to delete task: {data.name}</h3>
      </Modal.Header>
      <Modal.Footer>
        <div className="flex w-full gap-x-3">
          <Button
            className="w-full"
            variant="outlined"
            color="primary"
            text="No"
            onClick={() => onCancel?.()}
            type="button"
          />
          <Button
            className="w-full"
            variant="contained"
            color="primary"
            text="Yes"
            type="submit"
            onClick={() => deletePost()}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTaskConfirmDelete;
