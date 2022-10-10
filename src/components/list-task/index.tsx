import API from '@/api/network/task';
import {ITask} from '@/api/types/task.type';
import Checkbox from '@/lib/core-ui/checkbox';

interface IProp {
  list: ITask[];
  listID: string;
  msgToServer: () => void;
  refreshList: () => Promise<void>;
  // editTask: () => void;
  // deleteTask: () => void;
}

export default function ListTask({list, refreshList, msgToServer}: IProp) {
  const setDone = (id: string) => {
    if (!id) return;
    API.updateStatusTask(id).then(() => {
      refreshList();
      msgToServer();
    });
  };

  return (
    <>
      {list.map(task => (
        <div className="item" key={task.id}>
          <Checkbox checked={task.isDone} />
          <p className={`h6 ${task.isDone ? 'checked' : ''}`} onClick={() => setDone(task.id!)}>
            {task.name}
          </p>
        </div>
      ))}
    </>
  );
}
