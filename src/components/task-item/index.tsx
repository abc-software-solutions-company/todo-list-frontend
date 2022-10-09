import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import API from '@/api/network/task';
import {ITask} from '@/api/types/task.type';
import Checkbox from '@/core-ui/checkbox';
import IconButton from '@/core-ui/icon-button';

interface IProp {
  task: ITask;
  msgToServer: () => void;
  refreshList: () => Promise<void>;
  editTask: () => void;
  deleteTask: () => void;
}

export default function TaskItem({task, refreshList, msgToServer, editTask, deleteTask}: IProp) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id!});
  const setDone = (id: string) => {
    if (!id) return;
    API.updateStatusTask(id).then(() => {
      refreshList();
      msgToServer();
    });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div className="item" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Checkbox checked={task.isDone} onChange={() => setDone(task.id!)} />
      <p className={`h6 ${task.isDone ? 'checked' : ''}`} onClick={() => setDone(task.id!)}>
        {`${task.name} && ${task.index}`}
      </p>
      <div className="actions">
        <IconButton name="ico-edit" onClick={editTask} />
        <IconButton name="ico-trash-2" onClick={deleteTask} />
      </div>
    </div>
  );
}
