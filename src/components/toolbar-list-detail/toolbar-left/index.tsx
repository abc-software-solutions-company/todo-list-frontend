import {useRouter} from 'next/router';
import {FC} from 'react';

import Input from '@/core-ui/input';
import useBoards from '@/states/board/use-boards';
import useFilter from '@/states/filter/use-filter';
import useTodolist from '@/states/todolist/use-todolist';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';

import style from './style.module.scss';

const ToolBarLeft: FC = () => {
  const router = useRouter();
  const path = router.asPath;
  const {id} = router.query;

  const {boardData} = useBoards();
  const {todolist} = useTodolist();
  const {setNameFilterTask, nameFilter} = useFilter();
  const onNameFilter = (value: string) => setNameFilterTask(value);

  let listName = '';
  if (isListDetailPage(path, id as string)) listName = todolist.name;
  if (isBoardPage(path, id as string)) listName = boardData.name;

  return (
    <div className={style['toolbar-left']}>
      <p className="list-name">{listName}</p>
      <Input
        placeholder="Search by name"
        value={nameFilter}
        onChange={e => onNameFilter(e.target.value)}
        className="search"
      />
    </div>
  );
};

export default ToolBarLeft;
