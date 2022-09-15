import cls from 'classnames';
import {useRouter} from 'next/router';
import {FC} from 'react';

import TaskAPI, {ITask} from '@/api/network/task';
import {ROUTES} from '@/configs/routes.config';
import Button from '@/core-ui/button';
import {Modal} from '@/core-ui/modal';
import useToast from '@/core-ui/toast';

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
  const toast = useToast();
  const deletePost = () => {
    if (data?.id)
      TaskAPI.deleteTask(data?.id).then(() => {
        onConfirm?.();
        toast.show({type: 'success', title: 'Delete To-Do', content: 'Successful!'});
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
        <h3 className="title">
          <span className="block text-center md:inline">Are you sure you want to delete to-do:</span>
          <i className="block text-center md:inline">{data.name}</i>
        </h3>
      </Modal.Header>
      <Modal.Footer>
        <div className="flex w-full gap-x-3 md:gap-x-4 ">
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
