import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanColumn from './column';
import KanbanColumnBody from './column/body';
import KanbanColumnFooter from './column/footer';
import KanbanColumnHeader from './column/header';
import KanbanContainer from './container';

interface IListTaskKanban {
  id: string;
}

const ListTaskKanban = ({id}: IListTaskKanban) => {
  const {todolistKanban, statusList} = useTodolistKanban();
  const {todolist} = useTodolist();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const onAddTask = (columnId: number) => {
    setSelectedTodolist(todolistKanban);
    setIsOpenModal('createTask');
    setSelectedColumnId(columnId);
  };

  if (todolistKanban)
    return (
      <KanbanContainer>
        {statusList.map(column => (
          <KanbanColumn key={column.id}>
            <KanbanColumnHeader name={column.name} color={column.color} />
            <KanbanColumnBody statusId={column.id} tasks={todolist.tasks.filter(e => e.statusId == column.id)} />
            <KanbanColumnFooter onAddTask={() => onAddTask(column.id)} />
          </KanbanColumn>
        ))}
      </KanbanContainer>
    );

  return <></>;
};

export default ListTaskKanban;
