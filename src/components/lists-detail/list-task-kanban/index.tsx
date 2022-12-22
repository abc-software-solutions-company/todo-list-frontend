import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumn from './column';
import KanbanColumnBody from './column/body';
import KanbanColumnFooter from './column/footer';
import KanbanColumnHeader from './column/header';
import KanbanContainer from './container';

const ListTaskKanban = () => {
  const {todolistKanban, todolist} = useTodolist();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const onAddTask = (columnId: number) => {
    setSelectedTodolist(todolist);
    setIsOpenModal('createTask');
    setSelectedColumnId(columnId);
  };

  if (todolistKanban)
    return (
      <KanbanContainer>
        {todolistKanban.map(column => (
          <KanbanColumn key={column.id}>
            <KanbanColumnHeader name={column.name} color={column.color} />
            <KanbanColumnBody statusId={column.id} tasks={column.tasks || []} />
            <KanbanColumnFooter onAddTask={() => onAddTask(column.id)} />
          </KanbanColumn>
        ))}
      </KanbanContainer>
    );

  return <></>;
};

export default ListTaskKanban;
