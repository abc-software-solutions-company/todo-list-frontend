import {FC, useEffect} from 'react';

import ToolbarDetail from '@/components/lists-detail/toolbar';
import useTodolistKanban from '@/states/todolist-kanban/use-kanban';

import ErrorInformation from '../common/404';
import Loading from '../common/loading';
import Seo from '../common/seo/seo';
import ListTaskKanban from '../lists-detail/list-task-kanban';
import styles from './style.module.scss';

export interface Iprops {
  id: string;
}

const ListDetailKanban: FC<Iprops> = ({id}) => {
  const {todolistKanban, getKanban, error, loading} = useTodolistKanban();

  useEffect(() => {
    getKanban(id);
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorInformation />;
  if (!todolistKanban) return null;

  return (
    <>
      <Seo title={todolistKanban.name} />
      <div className={styles['list-detail-kanban']}>
        <div className="container">
          {/* <ToolbarDetail /> */}
          <ListTaskKanban />
        </div>
      </div>
    </>
  );
};

export default ListDetailKanban;
