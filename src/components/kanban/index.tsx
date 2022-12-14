import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';

import useTodolist from '@/states/todolist/use-todolist';

interface IProps {
  id: string;
}
const Kanban: FC<IProps> = () => {
  const {todolist, initial, error} = useTodolist();
  console.log('🚀 ~ file: index.tsx:9 ~ todolist', todolist);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    initial(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!todolist || error) return null;
  const columns = todolist.status;

  return (
    <div className="container my-5 grid auto-cols-fr grid-flow-col">
      {columns.length > 0 &&
        columns.map(status => {
          return (
            <div key={status.id}>
              <div className="border p-2 text-center">{status.name}</div>
              <div>
                {todolist.tasks
                  .filter(x => x.statusId == status.id)
                  .map(task => {
                    return (
                      <div key={task.id} className="border p-2 text-center">
                        {task.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Kanban;
