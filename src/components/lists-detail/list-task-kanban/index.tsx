import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumn from './column';

const ListTaskKanban = () => {
  const {todolist, statusFilter, write, setTodolist} = useTodolist();

  const getTasks = () => {
    if (statusFilter) return todolist.tasks.filter(e => !statusFilter || e.statusId == statusFilter);
    return todolist.tasks?.filter(e => !e.isDone);
  };

  const tasks = getTasks();

  return (
    <KanbanColumn
      setTodolist={setTodolist}
      tasks={tasks.filter(e => e.statusId == todolist.status[0].id)}
      todolist={todolist}
      write={write}
    />
  );
};

export default ListTaskKanban;
