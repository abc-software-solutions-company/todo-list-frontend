import {DndContext} from '@dnd-kit/core';
import {FC, useEffect} from 'react';

import useTodolist from '@/states/todolist/use-todolist';

import Column from './column';

interface IProps {
  id: string;
}
const Kanban: FC<IProps> = ({id}) => {
  const {todolist, initial} = useTodolist();

  useEffect(() => {
    initial(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!todolist) return null;
  const columns = todolist.status;

  return (
    <>
      <DndContext>
        <div className="container my-5 grid auto-cols-fr grid-flow-col">
          {columns.length > 0 &&
            columns.map(status => {
              return (
                <div key={status.id}>
                  <div className="border p-2 text-center">{status.name}</div>
                  <Column items={status.tasks} />
                </div>
              );
            })}
        </div>
      </DndContext>
    </>
  );
};

export default Kanban;
