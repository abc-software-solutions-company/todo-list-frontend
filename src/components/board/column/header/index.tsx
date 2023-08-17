import React, {FC, memo} from 'react';

import Icon from '@/core-ui/icon';
import useBoards from '@/states/board/use-boards';
import useModals from '@/states/modals/use-modals';

import style from './style.module.scss';

interface IKanbanColumnHeaderProps {
  name: string;
  color: string;
  numberTasks?: number;
  columnId: string;
}

const KanbanColumnHeader: FC<IKanbanColumnHeaderProps> = ({name, color, numberTasks, columnId}) => {
  console.log('🚀 ~ file: index.tsx:17 ~ name:', name);
  const {boardData} = useBoards();
  const {setIsOpenModal, setSelectedTodolist, setSelectedColumnId} = useModals();

  const onAddTask = () => {
    setSelectedTodolist(boardData);
    setIsOpenModal('createTask');
    setSelectedColumnId(Number(columnId));
  };

  return (
    <div className={style['kanban-column-header']}>
      <p className="column-name" style={{color}}>
        {`${name} (${numberTasks ? numberTasks : 0})`}
      </p>
      {name !== 'Done' && <Icon name="ico-plus-circle" className="btn-add-task" onClick={onAddTask} />}
    </div>
  );
};

export default memo(KanbanColumnHeader);
