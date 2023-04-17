import {useDroppable} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
import React, {FC, memo} from 'react';

import KanbanTaskItem from './item';
import style from './style.module.scss';

interface IKanbanColumnBody {
  itemIds?: string[];
  columnId: string;
}
const KanbanColumnBody: FC<IKanbanColumnBody> = ({columnId, itemIds = []}) => {
  const {setNodeRef} = useDroppable({id: columnId});

  return (
    <SortableContext id={columnId} items={itemIds} strategy={verticalListSortingStrategy}>
      <ul className={style['column-body']} ref={setNodeRef}>
        {itemIds.map((itemId, i) => (
          <KanbanTaskItem key={i} itemId={itemId} />
        ))}
      </ul>
    </SortableContext>
  );
};

export default memo(KanbanColumnBody);
