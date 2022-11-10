import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import classNames from 'classnames';
import {useRouter} from 'next/router';

import {ROUTES} from '@/configs/routes.config';
import Checkbox from '@/core-ui/checkbox';
import api from '@/data/api/index';
import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';

import Actions from './actions';
import style from './style.module.scss';

export interface ITaskItemProps {
  task: ITaskResponse;
  onEdit?: () => void;
  onDelete?: () => void;
  statusList: IStatus[];
  isSelect: boolean;
  readonly: boolean;
}

export default function TaskItem(props: ITaskItemProps) {
  const {task, statusList, isSelect, readonly} = props;
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: task!.id!});
  statusList?.sort((a, b) => a.id - b.id);

  const setDone = (id: string, isDone: boolean) => {
    if (!id) return;
    api.task
      .update({id, isDone: !isDone})
      .then(socketUpdateList)
      .catch(() => {});
  };

  const styleDnd = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const router = useRouter();

  return (
    <div
      className={classNames(style.task, `item ${isSelect && 'select'}`)}
      ref={setNodeRef}
      style={styleDnd}
      {...attributes}
      {...listeners}
      onClick={e => {
        const elmCheckbox = e.currentTarget.querySelector('.form-checkbox') as HTMLInputElement | null;
        const elmText = e.currentTarget.querySelector('h6')?.classList;
        if (task?.isDone) {
          elmText?.remove('checked');
          elmCheckbox?.removeAttribute('checked');
        } else {
          elmText?.add('checked');
          elmCheckbox?.setAttribute('checked', '');
        }
      }}
    >
      <Checkbox checked={task?.isDone} onChange={() => setDone(task.id, task.isDone)} disabled={readonly} />
      <p className={`h6 ${task.isDone ? 'checked' : ''}`} onClick={() => router.push(ROUTES.TASK + '/' + task.id)}>
        {task.name}
      </p>
      <Actions {...props} />
    </div>
  );
}
