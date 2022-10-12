import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import API from '@/api/network/task';
import {ITask} from '@/api/types/task.type';
import Checkbox from '@/lib/core-ui/checkbox';
import IconButton from '@/lib/core-ui/icon-button';

interface IProp {
  task: ITask;
  msgToServer: () => void;
  refreshList: () => Promise<void>;
  editTask: () => void;
  deleteTask: () => void;
}

export default function TaskItem({task, refreshList, msgToServer, editTask, deleteTask}: IProp) {
  const {attributes, listeners, setNodeRef, transform, isDragging, isOver} = useSortable({id: task.id!});
  const setDone = (id: string) => {
    if (!id) return;
    API.updateStatusTask(id).then(() => {
      refreshList();
      msgToServer();
    });
  };

  const style = {
    transform: CSS.Transform.toString(transform)
    // zIndex: isDragging ? '10' : '-10',
    // opacity: isOver ? 0.3 : 1
    // zIndex: isDragging ? '10' : '-10'
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
        if (task.isDone) {
          elmText?.remove('checked');
          elmCheckbox?.removeAttribute('checked');
        } else {
          elmText?.add('checked');
          elmCheckbox?.setAttribute('checked', '');
        }
      }}
    >
      <Checkbox checked={task.isDone} onChange={() => setDone(task.id!)} />
      <p className={`h6 ${task.isDone ? 'checked' : ''}`} onClick={() => setDone(task.id!)}>
        {task.name}
      </p>
      <div className="actions">
        <IconButton name="ico-edit" onClick={editTask} />
        <IconButton name="ico-trash-2" onClick={deleteTask} />
      </div>
    </div>
  );
}
