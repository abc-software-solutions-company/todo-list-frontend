import {useEffect} from 'react';

import ErrorInformation from '@/components/common/404';
import Loading from '@/components/common/loading';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import KanbanContainer from './container';

interface IListTaskKanban {
  id: string;
}

const ListTaskKanban = ({id}: IListTaskKanban) => {
  const {todolistKanban, initial, error, loading} = useTodolistKanban();
  useEffect(() => {
    initial(id);
  }, [id]);
  if (error) return <ErrorInformation />;
  if (loading) return <Loading />;
  if (todolistKanban) return <KanbanContainer />;

  return <></>;
};

export default ListTaskKanban;
