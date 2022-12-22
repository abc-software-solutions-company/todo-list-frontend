import {FC} from 'react';
import {SubmitHandler} from 'react-hook-form';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';
import {ToastContents} from '@/utils/toast-content';

import ModalCreateUpdateTask from '../index-create-update';

export interface IProps {
  open: boolean;
  taskData?: ITaskResponse;
  todolistData?: ITodolistResponse;
  onClose: () => void;
  onSuccess?: () => void;
}

interface IFormInputs {
  name: string;
}

const ModalUpdateTask: FC<IProps> = props => {
  const {open, taskData, onClose, onSuccess} = props;
  const toast = useToast();
  const {todolistKanban, initial} = useTodolistKanban();

  const submitHandler: SubmitHandler<IFormInputs> = formData => {
    const {name} = formData;
    const req: Promise<any>[] = [];

    if (taskData) {
      const {id} = taskData;
      req.push(
        api.task.update({id, name}).then(() => {
          toast.show({type: 'success', title: 'Update To-Do', content: 'Successful!'});
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
      saveText="Save"
      taskData={taskData}
      title="Update Task"
      handleSave={submitHandler}
      onClose={onClose}
    />
  );
};

export default ModalUpdateTask;
