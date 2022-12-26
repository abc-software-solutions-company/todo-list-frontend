import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumn from './column';
import KanbanColumnBody from './column/body';
import KanbanColumnFooter from './column/footer';
import KanbanColumnHeader from './column/header';
import KanbanContainer from './container';

const ListTaskKanban = () => {
  const {todolistKanban, todolist, statusList} = useTodolist();

  if (todolistKanban) return <KanbanContainer />;
};

export default ListTaskKanban;
