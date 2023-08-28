import {useRouter} from 'next/router';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {useModalTaskDetailState} from '@/hooks/useModalTaskDetail';
import useTodolist from '@/states/todolist/use-todolist';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

export default function useModalDelete({onClose, onSuccess, data}: IProps) {
  const {todolist, setTodolist, getTodolist} = useTodolist();
  const modalTaskDetailState = useModalTaskDetailState();
  const router = useRouter();
  const toast = useToast();
  const {id} = data;

  const onClick = () => {
    let req;
    if (data.statusId) {
      req = api.task.update({id, isActive: false}).then(() => {
        if (router.asPath.includes(id)) {
          const newTodolist: ITodolistResponse = JSON.parse(JSON.stringify(todolist));
          newTodolist.tasks = newTodolist.tasks.filter(e => e.id !== id);
          setTodolist(newTodolist);
          router.back();
        }
        toast.show({type: 'success', title: 'Delete ', content: ToastContents.SUCCESS});
        modalTaskDetailState.setState(null);
      });

      req
        .then(onSuccess)
        .then(() => getTodolist(id))
        .catch(() =>
          toast.show({
            type: 'danger',
            title: 'Error',
            content: ToastContents.ERROR
          })
        );
    }

    onClose();
  };
  return {onClick};
}
