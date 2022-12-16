/* eslint-disable @typescript-eslint/no-unused-vars */
import {IKanbanColumn} from '@/states/kanban/types';
import useKanban from '@/states/kanban/use-kanban';
import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumn from './column';
import KanbanColumnBody from './column/body';
import KanbanContainer from './column/container';
import KanbanColumnHeader from './column/header';

const ListTaskKanban = () => {
  const {todolist} = useTodolist();
  const {setColumns} = useKanban();
  const dataColumn: IKanbanColumn[] = [];

  const getTasks = () => {
    return todolist.tasks;
  };

  const tasks = getTasks();
  const statusArr = todolist.status;
  console.log('ok');

  if (tasks) {
    statusArr.map(status => {
      dataColumn.push({tasks: tasks.filter(task => task.statusId == status.id), ...status});
    });
  }

  return (
    <>
      <KanbanContainer>
        {statusArr.map((status, idx) => (
          <KanbanColumn key={idx}>
            <KanbanColumnHeader name={status.name} key={idx} statusId={status.id} />
            <KanbanColumnBody tasks={tasks.filter(task => task.statusId == status.id)} />
          </KanbanColumn>
        ))}
      </KanbanContainer>
    </>
  );
};

export default ListTaskKanban;
