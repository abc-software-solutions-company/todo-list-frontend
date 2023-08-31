import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';

import Type from '@/components/task-detail/task-toolbar/type';
import {ROUTES} from '@/configs/routes.config';
import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useFilter from '@/states/filter/use-filter';
import useModals from '@/states/modals/use-modals';
import useTodolist from '@/states/todolist/use-todolist';
import {isBoardPage, isListDetailPage} from '@/utils/check-routes';
import {TaskTypeData} from '@/utils/constant';

import ToolFilter from '../../common/tool-filter';
import style from './style.module.scss';

const ToolBarRight: FC = () => {
  const router = useRouter();
  const path = router.asPath;
  const {id} = router.query;

  const {currentType, getFilterdTasks, setCurrentType, setFilterTasks} = useFilter();
  const {boardData, owner: boardOwner, write: boardWrite} = useBoards();
  const {todolist, statusList, write, owner} = useTodolist();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const setSelectList = () => {
    if (isListDetailPage(path, id as string)) {
      setSelectedTodolist(todolist);
      const statusIdList = statusList.map((e: {id: number}) => e.id);
      const backlogId = Math.min(...statusIdList);
      setSelectedColumnId(backlogId);
    }
    if (isBoardPage(path, id as string)) setSelectedTodolist(boardData);
  };

  const onSettingBoard = () => {
    setSelectList();
    setIsOpenModal('settings');
  };

  const onAddTask = () => {
    setSelectList();
    setIsOpenModal('createTask');
  };

  const isKanbanView = router.asPath.includes(ROUTES.KANBAN) ? true : false;

  useEffect(() => {
    setFilterTasks(getFilterdTasks(todolist.tasks, false));
  }, [currentType]);

  return (
    <div className={style['toolbar-right']}>
      <div className="view-mode">
        {!isKanbanView && (write || owner || boardOwner || boardWrite) ? (
          <div className={`add-task flex items-center hover:cursor-pointer`} onClick={onAddTask}>
            <span className="hidden sm:block">Add Task</span>
            <Icon name="add-task" className="ico-plus-circle icons" size={20} onClick={onAddTask} />
          </div>
        ) : (
          ''
        )}
        <div className={`kanban-view ${!isKanbanView ? '' : 'active'} flex items-center`}>
          <Icon
            name="horizontal"
            className="ico-carbon-horizontal-view icons"
            size={20}
            onClick={() => router.push(`${ROUTES.KANBAN}/${id}`)}
          />
        </div>
        <div className={`list-view ${isKanbanView ? '' : 'active'} flex items-center`}>
          <Icon
            name="list-view"
            className="ico-carbon-vertical-view icons"
            size={20}
            onClick={() => router.push(`${ROUTES.LIST}/${id}`)}
          />
        </div>
        <div
          className="flex cursor-pointer items-center gap-x-1"
          onClick={() => router.push(`${ROUTES.DOCUMENT}/${id}`)}
        >
          <Icon name="documents" className="ico-note-list icons" size={20} />
          <span>Docs</span>
        </div>
        <Type
          data={TaskTypeData}
          trigger={
            <div className="flex cursor-pointer items-center gap-x-1">
              <Icon name="Settings" className="ico-receipt icons" size={20} />
              <span className="hidden sm:block">Type</span>
            </div>
          }
          onSelect={value => setCurrentType(value)}
        />
        <div className="tool-filter">
          <ToolFilter todolist={!isKanbanView ? todolist : boardData} />
        </div>
      </div>
      {(write || owner || boardOwner || boardWrite) && (
        <div className="settings flex items-center hover:cursor-pointer" onClick={() => onSettingBoard()}>
          <Icon name="Settings" className="ico-settings icons" size={20} />
          <span className="hidden sm:block">Settings</span>
        </div>
      )}
    </div>
  );
};

export default ToolBarRight;
