import {useEffect} from 'react';

import ErrorInformation from '@/components/common/404';
import Loading from '@/components/common/loading';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanColumn from './column';
import KanbanColumnBody from './column/body';
import KanbanColumnHeader from './column/header';
import KanbanContainer from './container';

interface IListTaskKanban {
  id: string;
}

const ListTaskKanban = ({id}: IListTaskKanban) => {
  const {todolistKanban, initial, error, loading} = useTodolistKanban();

  useEffect(() => {
    initial(id);
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorInformation />;

  if (todolistKanban)
    return (
      <KanbanContainer>
        {todolistKanban.status?.map(column => (
          <KanbanColumn key={column.id} onDragEnd={() => {}} onDragStart={() => {}} onDragOver={() => {}}>
            <KanbanColumnHeader name={column.name} />
            <KanbanColumnBody tasks={column.tasks || []} />
          </KanbanColumn>
        ))}
      </KanbanContainer>
    );

  return <></>;
};

export default ListTaskKanban;
