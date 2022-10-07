import {ITask} from '@/api/types/task.type';
import Checkbox from '@/core-ui/checkbox';

interface IProp {
  list: ITask[];
  // setDone: (taskId: string) => void;
  // editTask: () => void;
  // deleteTask: () => void;
}

export default function ListTask({list}: IProp) {
  console.log(list);

  return (
    <>
      {list.map(task => (
        <div className="item" key={task.id}>
          <Checkbox checked={task.isDone} />
          <p className={`h6 ${task.isDone ? 'checked' : ''}`}>{task.name}</p>
        </div>
      ))}
    </>
  );
}
