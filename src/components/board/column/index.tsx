import React, {FC, memo} from 'react';

import {useBoardState} from '@/hooks/useBoardState';

import KanbanColumnBody from './body';
import KanbanColumnFooter from './footer/add-task';
import KanbanColumnHeader from './header';
import KanbanColumnWrapper from './wrapper';

export interface IKanbanColumnProps {
  columnId: string;
  itemIds: string[];
  showHeader?: boolean;
}

const KanbanColumn: FC<IKanbanColumnProps> = ({columnId, itemIds, showHeader = true}) => {
  const boardStore = useBoardState();
  const {name, color, tasks} = boardStore.entitiesColumn[columnId].status;

  return (
    <KanbanColumnWrapper columnId={columnId}>
      <KanbanColumnHeader name={name} color={color} numberTasks={tasks?.length} columnId={columnId} />
      <KanbanColumnBody columnId={columnId} itemIds={itemIds} />
      {showHeader && <KanbanColumnFooter columnId={columnId} />}
    </KanbanColumnWrapper>
  );
};

export default memo(KanbanColumn);
