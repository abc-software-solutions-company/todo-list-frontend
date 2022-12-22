import {FC} from 'react';
import {SubmitHandler} from 'react-hook-form';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITodolistKanbanResponse, ITodolistResponse} from '@/data/api/types/todolist.type';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';
import {ToastContents} from '@/utils/toast-content';

import ModalCreateUpdateTask from '../index-create-update';

export interface IProps {
  open: boolean;
  todolistData?: ITodolistResponse | ITodolistKanbanResponse;
  statusId?: number;
  onClose: () => void;
  onSuccess?: () => void;
}

interface IFormInputs {
  name: string;
  statusId?: number;
}

const ModalCreateTask: FC<IProps> = props => {
  const {open, todolistData, onClose, onSuccess, statusId} = props;
  const toast = useToast();
  const {initial, todolistKanban} = useTodolistKanban();

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    const {name} = formData;
    const req: Promise<any>[] = [];

    if (todolistData) {
      req.push(
        api.task.create({name, todolistId: todolistData.id, statusId}).then(() => {
          toast.show({type: 'success', title: 'Create To-Do', content: 'Successful!'});
        })
      );
    }

    Promise.allSettled(req)
      .then(onSuccess)
      .then(() => initial(todolistKanban.id))
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
