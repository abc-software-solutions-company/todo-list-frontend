import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import API from '@/api/network/task';
import {ITask} from '@/api/types/task.type';
import Checkbox from '@/core-ui/checkbox';

interface IProp {
  task: ITask;
  msgToServer: () => void;
  refreshList: () => Promise<void>;
}

export default function TaskItem({task, refreshList, msgToServer}: IProp) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: task.id!});
  const setDone = (id: string) => {
    console.log('aaaaa');

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
      <Checkbox checked={task.isDone} onClick={() => setDone(task.id!)} />
      <p className={`h6 ${task.isDone ? 'checked' : ''}`} onClick={() => setDone(task.id!)}>
        {task.name}
      </p>
    </div>
  );
}
