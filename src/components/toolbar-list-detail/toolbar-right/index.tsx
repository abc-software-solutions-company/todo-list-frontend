import {useRouter} from 'next/router';
import {FC} from 'react';

import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';

import ToolFilter from '../../common/tool-filter';
import style from './style.module.scss';

const ToolBarRight: FC = () => {
  const router = useRouter();
  const path = router.asPath;
  const {id} = router.query;

  const {boardData} = useBoards();
  const {todolist, statusList, write, owner} = useTodolist();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const setSelectList = () => {
    if (isListDetailPage(path, id as string)) {
      setSelectedTodolist(todolist);
      const statusIdList = statusList.map(e => e.id);
      const backlogId = Math.min(...statusIdList);
      setSelectedColumnId(backlogId);
    }
    if (isBoardPage(path, id as string)) setSelectedTodolist(boardData);
  };

  const onSettingBoard = () => {
    setSelectList();
    setIsOpenModal('settings');
  };

  const onDelete = () => {
    setSelectList();
    setIsOpenModal('deleteList');
  };

  const onAddTask = () => {
    setSelectList();
    setIsOpenModal('createTask');
  };

  const isKanbanView = router.asPath.includes(ROUTES.KANBAN) ? true : false;

  return (
    <div className={style['toolbar-right']}>
      <div className="view-mode">
        {!isKanbanView && (write || owner) ? (
          <div className={`add-task hover:cursor-pointer`} onClick={onAddTask}>
            <span className="hidden sm:block">Add Task</span>
            <Icon name="add-task" className="ico-plus-circle icons" size={16} onClick={onAddTask} />
          </div>
        ) : (
          ''
        )}
        <div className={`kanban-view ${!isKanbanView ? '' : 'active'}`}>
          <Icon
            name="list-view"
            className="ico-vertical icons"
            size={16}
            onClick={() => router.push(`${ROUTES.KANBAN}/${id}`)}
          />
        </div>
        <div className={`list-view ${isKanbanView ? '' : 'active'}`}>
          <Icon
            name="horizontal"
            className="ico-horizontal icons"
            size={16}
            onClick={() => router.push(`${ROUTES.LIST}/${id}`)}
          />
        </div>
        <div className="flex cursor-pointer items-center" onClick={() => router.push(`${ROUTES.DOCUMENT}/${id}`)}>
          <Icon name="documents" className="ico-note-list icons" size={24} />
          <span>Docs</span>
        </div>
        {!isKanbanView && (
          <div className="tool-filter">
            <ToolFilter todolist={todolist} />
          </div>
        )}
        {(write || owner) && (
          <div className="delete ml-1 hover:cursor-pointer" onClick={onDelete}>
            <span className="hidden sm:block">Delete</span>
            <Icon name="Delete list" className="ico-trash-2 icons" size={16} onClick={onDelete} />
          </div>
        )}
      </div>
      {(write || owner) && (
        <div className="settings hover:cursor-pointer" onClick={() => onSettingBoard()}>
          <span className="hidden sm:block">Settings</span>
          <Icon name="Settings" className="ico-settings icons" size={16} />
        </div>
      )}
    </div>
  );
};

export default ToolBarRight;
