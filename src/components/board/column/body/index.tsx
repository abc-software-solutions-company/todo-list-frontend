import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {FC, memo} from 'react';

import KanbanTaskItem from './item';
import style from './style.module.scss';

interface IKanbanColumnBody {
  taskIds?: string[];
  id: string;
}

const KanbanColumnBody: FC<IKanbanColumnBody> = ({id, taskIds = []}) => {
  const {setNodeRef} = useDroppable({id});

  return (
    <SortableContext id={id} items={taskIds} strategy={verticalListSortingStrategy}>
      <ul className={style['column-body']} ref={setNodeRef}>
        {taskIds.map((taskId, idx: number) => (
          <KanbanTaskItem key={idx} id={taskId} />
        ))}
      </ul>
    </SortableContext>
  );
};
export default memo(KanbanColumnBody);
