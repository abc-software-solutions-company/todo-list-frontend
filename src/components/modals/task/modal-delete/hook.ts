import {useRouter} from 'next/router';
import {useEffect} from 'react';

import useToast from '@/core-ui/toast';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {useModalTaskDetailState} from '@/hooks/useModalTaskDetail';
import useTask from '@/states/task/use-task';
import useTodolist from '@/states/todolist/use-todolist';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

export default function useModalDelete({onClose, onSuccess, data}: IProps) {
  const {todolist, setTodolist, getTodolist} = useTodolist();
  const {isDelecting, error, destroy} = useTask();
  const modalTaskDetailState = useModalTaskDetailState();
  const router = useRouter();
  const toast = useToast();
  const {id} = data;

  const onClick = () => {
    if (data.statusId) {
      destroy(id);
    }
    onClose();
  };

  useEffect(() => {
    if (isDelecting === false && !error) {
      if (router.asPath.includes(id)) {
        const newTodolist: ITodolistResponse = JSON.parse(JSON.stringify(todolist));
        newTodolist.tasks = newTodolist.tasks.filter(e => e.id !== id);
        setTodolist(newTodolist);
        router.back();
      }
      toast.show({type: 'success', title: 'Delete ', content: ToastContents.SUCCESS});
      modalTaskDetailState.setState(null);

      onSuccess?.();
      getTodolist(id);
    }

    if (isDelecting === false && error) {
      toast.show({type: 'danger', title: 'Error', content: ToastContents.ERROR});
    }
  }, [isDelecting]);

  return {onClick};
}
