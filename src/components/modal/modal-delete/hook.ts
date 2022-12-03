import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useTodolist from '@/states/todolist/use-todolist';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

export default function useModalDelete({onClose, onSuccess, data}: IProps) {
  const {todolist, setTodolist} = useTodolist();
  const router = useRouter();
  const toast = useToast();
  const {id} = data;

  const onClick = () => {
    let req;
    if ((data as any).statusId)
      req = api.task.update({id, isActive: false}).then(() => {
        if (router.asPath.includes(ROUTES.LIST)) {
          const newTodolist: ITodolistResponse = JSON.parse(JSON.stringify(todolist));
          newTodolist.tasks = newTodolist.tasks.filter(e => e.id !== id);
          setTodolist(newTodolist);
        }
        toast.show({type: 'success', title: 'Delete ', content: ToastContents.SUCCESS});
      });
    else
      req = api.todolist.update({id, isActive: false}).then(() => {
        toast.show({type: 'success', title: 'Delete list', content: ToastContents.SUCCESS});
        if (router.asPath.includes(ROUTES.LIST + '/' + id)) {
          router.push(ROUTES.LIST);
        }
      });
    req.then(onSuccess).catch(() =>
      toast.show({
        type: 'danger',
        title: 'Error',
        content: ToastContents.ERROR
      })
    );
    onClose();
  };
  return {onClick};
}
