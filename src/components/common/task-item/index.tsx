/* eslint-disable @typescript-eslint/no-shadow */
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import Checkbox from '@/core-ui/checkbox';
import Icon from '@/core-ui/icon';
import useToast from '@/core-ui/toast';
import api from '@/data/api/index';
import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import useTasks from '@/states/tasks/use-tasks';
import {ToastContents} from '@/utils/toast-content';

import Actions from './actions';
import style from './style.module.scss';

export interface ITaskItemProps {
  task: ITaskResponse;
  todolist: ITodolistResponse;
  isSelect?: boolean;
  write?: boolean;
  kanban?: boolean;
}

export default function TaskItem(props: ITaskItemProps) {
  const {task, todolist, isSelect, write = false} = props;
  const {taskSymbol} = todolist;
  const {order, name, id, isDone} = task;
  const {getMyTasks} = useTasks();
  const toast = useToast();
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: id});

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const setDone = (id: string, isDone: boolean) => {
    if (!id) return;
    api.task
      .update({id, isDone: !isDone})
      .then(() => {
        socketUpdateList();
      })
      .then(getMyTasks)
      .catch(() => {});
  };

  const router = useRouter();

  const onChange = () => setDone(id, isDone);
  const onClick = () => router.push(ROUTES.TASK + '/' + id);
  const taskName = taskSymbol && order ? `${taskSymbol}-${order}:  ${name}` : name;
  const onCopyTaskName = () => {
    navigator.clipboard.writeText(taskName);
    toast.show({type: 'success', title: 'Copy task name success', content: ToastContents.SUCCESS});
  };
  return (
    <div
      className={classNames(style.task, `item ${isSelect && 'select'}`, 'hover:bg-blue-100')}
      ref={setNodeRef}
      style={styleDnd}
      {...attributes}
      {...listeners}
    >
      <Checkbox checked={isDone} onChange={onChange} disabled={!write} />
      <Icon name="ico-copy" className="pl-3" onClick={onCopyTaskName} />
      <div className={`h6 ${isDone && 'checked'}`} onClick={onClick}>
        {taskName}
      </div>
      <Actions {...{...props, todolist, write}} />
    </div>
  );
}
