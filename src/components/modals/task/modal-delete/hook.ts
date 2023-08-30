import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import {useModalTaskDetailState} from '@/hooks/useModalTaskDetail';
import useTask from '@/states/task/use-task';
import useTodolist from '@/states/todolist/use-todolist';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

export default function useModalDelete({onClose, onSuccess, data}: IProps) {
  const {todolist, getTodolist} = useTodolist();
  const {isDelecting, error, destroy, resetCrudState} = useTask();
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
        router.push(`${ROUTES.LIST}/${data.todolist.id}`);
      }
      toast.show({type: 'success', title: 'Delete ', content: ToastContents.SUCCESS});
      modalTaskDetailState.setState(null);

      onSuccess?.();
      getTodolist(todolist?.id || data?.todolist?.id);
      resetCrudState();
    }

    if (isDelecting === false && error) {
      toast.show({type: 'danger', title: 'Error', content: ToastContents.ERROR});
      resetCrudState();
    }
  }, [isDelecting]);

  return {onClick};
}
