import dynamic from 'next/dynamic';
import {FC, useEffect} from 'react';

import useTodolist from '@/states/todolist/use-todolist';

import ErrorInformation from '../common/404';

const ReactBeautifullDND = dynamic(() => import('@/components/react-beautifull-dnd'), {
  ssr: false
});

interface IProps {
  id: string;
}
const Kanban: FC<IProps> = ({id}: IProps) => {
  const {todolist, initial, error, loading} = useTodolist();
  useEffect(() => {
    initial(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return <p>Loading</p>;
  if (!todolist) return <></>;
  if (error) return <ErrorInformation />;
  if (todolist)
    return (
      <div>
        <ReactBeautifullDND itemsFromBackend={todolist.tasks} />
      </div>
    );
  return <></>;
};

export default Kanban;
