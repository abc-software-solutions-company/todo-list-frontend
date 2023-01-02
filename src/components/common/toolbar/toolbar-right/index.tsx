import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';

import ToolFilter from '../../tool-filter';
import style from './style.module.scss';

const ToolBarRight: FC = () => {
  const router = useRouter();
  const {id} = router.query;
  const {boardData} = useBoards();
  const {todolist} = useTodolist();
  const {setIsOpenModal, setSelectedTodolist} = useModals();

  const onSettingBoard = () => {
    if (router.asPath.includes(`${ROUTES.LIST}`)) setSelectedTodolist(todolist);
    if (router.asPath.includes(`${ROUTES.KANBAN}`)) setSelectedTodolist(boardData);
    setIsOpenModal('settings');
  };

  const onDelete = () => {
    if (router.asPath.includes(`${ROUTES.LIST}`)) setSelectedTodolist(todolist);
    if (router.asPath.includes(`${ROUTES.KANBAN}`)) setSelectedTodolist(boardData);
    setIsOpenModal('deleteList');
  };

  const isKanbanView = router.asPath.includes(ROUTES.KANBAN) ? true : false;
  return (
    <div className={style['toolbar-right']}>
      <div className="view-mode">
        <div className={`list-view ${!isKanbanView ? 'list-view-active' : ''}`}>
          <Icon
            name="list-view"
            className="ico-vertical leading-tight hover:cursor-pointer"
            size={16}
            onClick={() => router.push(`${ROUTES.LIST}/${id}`)}
          />
        </div>
        <div className={`kanban-view ${isKanbanView ? 'list-view-active' : ''}`}>
          <Icon
            name="horizontal"
            className="ico-horizontal leading-tight hover:cursor-pointer"
            size={16}
            onClick={() => router.push(`${ROUTES.KANBAN}/${id}`)}
          />
        </div>
        <div className="tool-filter">
          <ToolFilter todolist={todolist} />
        </div>
        <div className="delete">
          <span className="hidden sm:block">Settings</span>

          <Icon
            name="Delete list"
            className="ico-trash-2 leading-tight hover:cursor-pointer"
            size={16}
            onClick={onDelete}
          />
        </div>
      </div>
      <div className="sort hover:cursor-pointer">
        <span className="hidden sm:block">Sort</span>
        <Icon name="Sort" className="ico-sort leading-tight " size={16} />
      </div>
      <div className="settings hover:cursor-pointer" onClick={() => onSettingBoard()}>
        <span className="hidden sm:block">Settings</span>
        <Icon name="Settings" className="ico-settings leading-tight hover:cursor-pointer" size={16} />
      </div>
    </div>
  );
};

export default ToolBarRight;
