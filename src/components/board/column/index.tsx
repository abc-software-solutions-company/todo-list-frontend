import React, {FC, memo} from 'react';

import {useBoardState} from '@/hooks/useBoardState';

import KanbanColumnBody from './body';
import KanbanColumnFooter from './footer/add-task';
import KanbanColumnHeader from './header';
import KanbanColumnWrapper from './wrapper';

export interface IKanbanColumnProps {
  columnId: string;
  itemIds: string[];
}

const KanbanColumn: FC<IKanbanColumnProps> = ({columnId, itemIds}) => {
  const boardStore = useBoardState();
  const {name, color} = boardStore.entitiesColumn[columnId].status;

  return (
    <KanbanColumnWrapper columnId={columnId}>
      <KanbanColumnHeader name={name} color={color} />
      <KanbanColumnBody columnId={columnId} itemIds={itemIds} />
      <KanbanColumnFooter columnId={columnId} />
    </KanbanColumnWrapper>
  );
};

export default memo(KanbanColumn);
