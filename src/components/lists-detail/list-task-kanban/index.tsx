import {horizontalListSortingStrategy, SortableContext} from '@dnd-kit/sortable';

import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';

import KanbanColumn from './column';
import KanbanColumnBody from './column/body';
import KanbanColumnFooter from './column/footer';
import KanbanColumnHeader from './column/header';
import KanbanContainer from './container';

const ListTaskKanban = () => {
  const {todolistKanban, statusList, todolist, write} = useTodolist();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const onAddTask = (columnId: number) => {
    setSelectedTodolist(todolist);
    setIsOpenModal('createTask');
    setSelectedColumnId(columnId);
  };

  if (todolistKanban)
    return (
      <KanbanContainer>
        <SortableContext
          disabled={!write}
          items={statusList.map(column => column.id)}
          strategy={horizontalListSortingStrategy}
        >
          {todolist.status.map(column => (
            <KanbanColumn key={column.id} id={column.id}>
              <KanbanColumnHeader name={column.name} color={column.color} />
              <KanbanColumnBody statusId={column.id} tasks={todolist.tasks.filter(e => e.statusId == column.id)} />
              <KanbanColumnFooter id={column.id} onAddTask={() => onAddTask(column.id)} />
            </KanbanColumn>
          ))}
        </SortableContext>
      </KanbanContainer>
    );

  return <></>;
};

export default ListTaskKanban;
