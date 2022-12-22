import {useRouter} from 'next/router';

import useToast from '@/core-ui/toast';
import api from '@/data/api';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import useTodolist from '@/states/todolist/use-todolist';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';
import {ToastContents} from '@/utils/toast-content';

import {IProps} from '.';

export default function useModalDelete({onClose, onSuccess, data}: IProps) {
  const {todolist, setTodolist} = useTodolist();
  const {initial} = useTodolistKanban();
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
      });

      req
        .then(onSuccess)
        .then(() => initial(id))
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
