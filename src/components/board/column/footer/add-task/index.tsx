import React, {FC, memo} from 'react';

import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useModals from '@/states/modals/use-modals';

import style from './style.module.scss';

interface IKanbanColumnFooterProps {
  columnId: string;
}

const KanbanColumnFooter: FC<IKanbanColumnFooterProps> = ({columnId}) => {
  const {boardData} = useBoards();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const onAddTask = () => {
    setSelectedTodolist(boardData);
    setIsOpenModal('createTask');
    setSelectedColumnId(Number(columnId));
  };

  return (
    <div className={style['add-task-kanban']}>
      <Icon name="ico-plus-circle" className="btn-add-task" onClick={onAddTask} />
    </div>
  );
};
export default memo(KanbanColumnFooter);
