import {useRouter} from 'next/router';
import {FC} from 'react';

import useBoards from '@/states/board/use-boards';
import useTodolist from '@/states/todolist/use-todolist';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';

const ToolBarLeft: FC = () => {
  const router = useRouter();
  const path = router.asPath;
  const {id} = router.query;

  const {boardData} = useBoards();
  const {todolist} = useTodolist();

  let listName = '';
  if (isListDetailPage(path, id as string)) listName = todolist.name;
  if (isBoardPage(path, id as string)) listName = boardData.name;

  return (
    <div className="toolbar-left">
      <p>{listName}</p>
    </div>
  );
};

export default ToolBarLeft;
