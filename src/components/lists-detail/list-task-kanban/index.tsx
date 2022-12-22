import useModals from '@/states/modals/use-modals';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanColumn from './column';
import KanbanColumnBody from './column/body';
import KanbanColumnFooter from './column/footer';
import KanbanColumnHeader from './column/header';
import KanbanContainer from './container';

const ListTaskKanban = () => {
  const {todolistKanban} = useTodolistKanban();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const onAddTask = (columnId: number) => {
    setSelectedTodolist(todolistKanban);
    setIsOpenModal('createTask');
    setSelectedColumnId(columnId);
  };

  return (
    <KanbanContainer>
      {todolistKanban.status?.map(column => (
        <KanbanColumn key={column.id}>
          <KanbanColumnHeader name={column.name} color={column.color} />
          <KanbanColumnBody tasks={column.tasks!} />
          <KanbanColumnFooter onAddTask={() => onAddTask(column.id)} />
        </KanbanColumn>
      ))}
    </KanbanContainer>
  );
};

export default ListTaskKanban;
