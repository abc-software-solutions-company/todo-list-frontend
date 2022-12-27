import useTodolist from '@/states/todolist/use-todolist';

import KanbanContainer from './container';

const ListTaskKanban = () => {
  const {todolistKanban} = useTodolist();

  if (todolistKanban) return <KanbanContainer />;

  return <p>Oh no in list task kanban</p>;
};

export default ListTaskKanban;
