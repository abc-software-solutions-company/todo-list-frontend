import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';

import style from './style.module.scss';

const TopBarShare: FC = () => {
  const {boardData} = useBoards();
  const {todolist} = useTodolist();
  const router = useRouter();
  const {setSelectedTodolist, setIsOpenModal} = useModals();
  const onShare = () => {
    if (router.asPath.includes(`${ROUTES.LIST}`)) setSelectedTodolist(todolist);
    if (router.asPath.includes(`${ROUTES.KANBAN}`)) setSelectedTodolist(boardData);
    setIsOpenModal('shareList');
  };
  return (
    <div className={style['topbar-share']} onClick={onShare}>
      <Icon name="Share" className="ico-share-3  text-white" />
      Share
    </div>
  );
};

export default TopBarShare;
