import {useRouter} from 'next/router';
import {FC} from 'react';
import {SubmitHandler} from 'react-hook-form';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {useModalTaskDetailState} from '@/hooks/useModalTaskDetail';
import useTodolist from '@/states/todolist/use-todolist';
import {ToastContents} from '@/utils/toast-content';

import ModalCreateUpdateTask from '../index-create-update';

export interface IProps {
  open: boolean;
  todolistData?: ITodolistResponse;
  statusId?: number;
  onClose: () => void;
  onSuccess?: () => void;
}

interface IFormInputs {
  name: string;
  statusId?: number;
}

const ModalCreateTask: FC<IProps> = props => {
  const router = useRouter();
  const {todolist, getTodolist} = useTodolist();
  const {open, todolistData, onClose, onSuccess, statusId} = props;
  const toast = useToast();
  const modalTaskDetailState = useModalTaskDetailState();

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    const {name} = formData;
    const req: Promise<any>[] = [];

    if (todolistData) {
      req.push(
        api.task.create({name, todolistId: todolistData.id, statusId}).then(res => {
          const isBoard = router.asPath.includes('board');
          if (isBoard) {
            modalTaskDetailState.setState(res.data);
          }
          toast.show({type: 'success', title: 'Create To-Do', content: 'Successful!'});
        })
      );
    }

    Promise.allSettled(req)
      .then(onSuccess)
      .then(() => getTodolist(todolist.id))
      .catch(() => toast.show({type: 'danger', title: 'Error', content: ToastContents.ERROR}));

    onClose();
  };

  return (
    <ModalCreateUpdateTask
      open={open}
      saveText="Create"
      title="Create New Task"
      handleSave={submitHandler}
      onClose={onClose}
    />
  );
};

export default ModalCreateTask;
