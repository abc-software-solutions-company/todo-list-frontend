/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect} from 'react';

import {IKanbanColumn} from '@/states/kanban/types';
import useKanban from '@/states/kanban/use-kanban';
import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumn from './column';
import KanbanColumnBody from './column/body';
import KanbanContainer from './column/container';
import KanbanColumnHeader from './column/header';

const ListTaskKanban = () => {
  const {todolist} = useTodolist();
  const {setColumns, kanban} = useKanban();

  useEffect(() => {
    if (todolist) setColumns(todolist);
  }, []);

  return (
    <>
      <KanbanContainer>
        {kanban.map((column, idx) => (
          <KanbanColumn key={idx}>
            <KanbanColumnHeader name={column.name} key={idx} statusId={column.id} />
            <KanbanColumnBody tasks={column.tasks} />
          </KanbanColumn>
        ))}
      </KanbanContainer>
    </>
  );
};

export default ListTaskKanban;
