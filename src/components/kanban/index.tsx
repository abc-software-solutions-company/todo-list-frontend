import {FC, useEffect} from 'react';

import api from '@/data/api';
import {IKanbanColumn} from '@/states/kanban/types';

import useKanban from './hooks';

const Kanban: FC = () => {
  const {columns, setColumns} = useKanban();

  useEffect(() => {
    api.todolist.getOne({id: '1hjzi'}).then(res => {
      if (res) setColumns(res.data.status as IKanbanColumn[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid auto-cols-fr grid-flow-col">
      {columns.length > 0 &&
        columns.map(status => {
          return (
            <div key={status.id}>
              <div className="border">{status.name}</div>
              <div>
                {status.tasks.map(task => {
                  return (
                    <div key={task.id} className="border">
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
