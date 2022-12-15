import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumn from './column';
import KanbanContainer from './column/container';
import KanbanColumnHeader from './column/header';

const ListTaskKanban = () => {
  const {todolist, write, setTodolist} = useTodolist();

  const getTasks = () => {
    return todolist.tasks;
  };

  const tasks = getTasks();
  const statusArr = todolist.status;

  return (
    <>
      <KanbanContainer>
        {statusArr.map((status, idx) => (
          <KanbanColumnHeader name={status.name} key={idx}>
            <KanbanColumn
              setTodolist={setTodolist}
              tasks={tasks.filter(task => task.statusId == status.id)}
              todolist={todolist}
              write={write}
            />
          </KanbanColumnHeader>
        ))}
      </KanbanContainer>
    </>
  );
};

export default ListTaskKanban;
