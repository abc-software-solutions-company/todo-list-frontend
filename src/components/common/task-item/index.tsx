import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import classNames from 'classnames';
import Image from 'next/image';
import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import {ITaskResponse} from '@/data/api/types/task.type';
import {ITodolistResponse} from '@/data/api/types/todolist.type';
import {getTaskType} from '@/utils/task';

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
  const {order, name, type, id, isDone} = task;
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: id});

  const taskType = getTaskType(type);

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const router = useRouter();

  const onClick = () => router.push(ROUTES.TASK + '/' + id);
  const taskName = taskSymbol && order ? `${taskSymbol}-${order}:  ${name}` : name;

  return (
    <div
      className={classNames(style.task, `item ${isSelect && 'select'}`, 'hover:bg-blue-100')}
      ref={setNodeRef}
      style={styleDnd}
      {...attributes}
      {...listeners}
    >
      <Image src={`/icons/${taskType?.icon}`} alt="" width={24} height={24} />
      <div className={`h6 ${isDone && 'checked'}`} onClick={onClick}>
        {taskName}
      </div>
      <Actions {...{...props, todolist, write, taskName}} />
    </div>
  );
}
