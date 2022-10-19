import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import Checkbox from '@/core-ui/checkbox';
import IconButton from '@/core-ui/icon-button';
import API from '@/data/api/index';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';

interface IProp {
  task?: ITaskResponse;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskItem({task, onEdit, onDelete}: IProp) {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: task!.id!});
  const setDone = (id: string, isDone: boolean) => {
    if (!id) return;
    API.task
      .update({id, isDone: !isDone})
      .then(socketUpdateList)
      .catch(() => {});
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div
      className="item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={e => {
        const elmCheckbox = e.currentTarget.querySelector('.form-checkbox') as HTMLInputElement | null;
        const elmText = e.currentTarget.querySelector('h6')?.classList;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if (task?.isDone) {
          elmText?.remove('checked');
          elmCheckbox?.removeAttribute('checked');
        } else {
          elmText?.add('checked');
          elmCheckbox?.setAttribute('checked', '');
        }
      }}
    >
      <Checkbox checked={task?.isDone} onChange={() => setDone(task!.id!, task!.isDone)} />
      <p className={`h6 ${task!.isDone ? 'checked' : ''}`} onClick={() => setDone(task!.id!, task!.isDone)}>
        {`${task!.name}`}
      </p>
      <div className="actions">
        {!isDragging ? (
          <>
            <IconButton name="ico-edit" onClick={onEdit} />
            <IconButton name="ico-trash-2" onClick={onDelete} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
