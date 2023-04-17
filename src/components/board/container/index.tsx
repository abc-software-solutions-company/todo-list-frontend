import {Active, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, Over} from '@dnd-kit/core';
import {arrayMove, horizontalListSortingStrategy, SortableContext} from '@dnd-kit/sortable';
import React, {FC, useCallback, useEffect, useState} from 'react';

import api from '@/data/api';
import {useBoardState} from '@/hooks/useBoardState';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useBoards from '@/states/board/use-boards';
import {getnewIndexForDragDrop} from '@/utils/function';
import {IApdater} from '@/utils/zustand-adapter';

import KanbanColumn from '../column';
import KanbanTaskItem from '../column/body/item';
import style from './style.module.scss';

export type BoardState = IApdater<string[]>;

const KanbanContainer: FC = () => {
  const sensors = useSensorGroup();
  const {listID, statusList} = useBoards();
  const boardStore = useBoardState();
  const [boardState, setBoardState] = useState<BoardState>({ids: [], entities: {}});
  const [activeItemId, setActiveItemId] = useState<string>();
  const [activeColumnId, setActiveColumnId] = useState<string>();

  useEffect(() => {
    boardStore.generateState(statusList);
  }, [statusList]);

  useEffect(() => {
    if (!boardState.ids.length) {
      const entities: BoardState['entities'] = {};
      const ids = boardStore.ids.map(key => {
        entities[key] = boardStore.entitiesColumn[key].ids;
        return key;
      });
      setBoardState({ids, entities});
    }
  }, [boardStore]);

  const getDragData = useCallback(({active, over}: {active: Active; over: Over | null}) => {
    if (!over?.id) return null;
    const activeId = active.id as string;
    const overId = over.id as string;
    const activeColumn = active.data.current?.sortable?.containerId as string | undefined;
    const overContainerId = over?.data.current?.sortable?.containerId as string | undefined;
    const overColumn = activeColumn !== 'board' && overContainerId === 'board' ? overId : overContainerId;
    if (!activeColumn || !overColumn) return null;
    const overIndex = over?.data.current?.sortable?.index as number | undefined;
    const activeIndex = over?.data.current?.sortable?.index as number | undefined;
    if (overIndex === undefined || activeIndex === undefined || overIndex < 0) return null;
    return {activeColumn, overColumn, activeIndex, overIndex, activeId, overId};
  }, []);

  const onDragStart = useCallback(
    ({active}: DragStartEvent) =>
      active.data.current?.sortable?.containerId === 'board'
        ? setActiveColumnId(active.id as string)
        : setActiveItemId(active.id as string),
    []
  );

  const onDragCancel = useCallback(() => {
    setActiveItemId(undefined);
    setActiveColumnId(undefined);
  }, []);

  const onDragOver = useCallback(
    ({active, over}: DragOverEvent) => {
      const dragData = getDragData({active, over});
      if (!dragData) return;
      const {activeColumn, overColumn, overIndex, activeId} = dragData;
      if (activeColumn === overColumn) return;
      const newEntities = {...boardState.entities};
      newEntities[activeColumn] = newEntities[activeColumn].filter(e => e !== activeId);
      const overEntity = newEntities[overColumn];
      newEntities[overColumn] = [...overEntity.slice(0, overIndex), activeId, ...overEntity.slice(overIndex)];
      setBoardState({...boardState, entities: newEntities});
    },
    [boardState, boardStore]
  );

  const onDragEnd = useCallback(
    ({active, over}: DragEndEvent) => {
      onDragCancel();
      const dragData = getDragData({active, over});
      if (!dragData) return;
      const {activeColumn, overColumn, activeIndex, overIndex, activeId} = dragData;
      //move column
      if (activeColumn === 'board' && overColumn === 'board') {
        setBoardState({...boardState, ids: arrayMove(boardState.ids, activeIndex, overIndex)});
        const indexList = boardState.ids.map(e => boardStore.entitiesColumn[e].status.index);
        const prevIndex = boardStore.entitiesColumn[boardState.ids[overIndex - 1]]?.status.index;
        const nextIndex = boardStore.entitiesColumn[boardState.ids[overIndex + 1]]?.status.index;
        const {reset: resetIndexStatus, value: statusIndex} = getnewIndexForDragDrop({indexList, prevIndex, nextIndex});
        if (statusIndex) {
          boardStore.updateState(state => {
            state.entitiesColumn[activeId].status.index = statusIndex;
          });
          api.todolist.update({id: listID, statusId: Number(activeId), statusIndex, resetIndexStatus});
        }
      }
      // move item
      else if (activeColumn === overColumn) {
        const newEntities = {...boardState.entities};
        newEntities[activeColumn] = arrayMove(newEntities[activeColumn], activeIndex, overIndex);
        setBoardState({...boardState, entities: newEntities});
        const indexList = newEntities[overColumn].map(e => boardStore.entitiesItem[e].indexColumn);
        const prevIndex = boardStore.entitiesItem[boardState.entities[overColumn][overIndex - 1]]?.indexColumn;
        const nextIndex = boardStore.entitiesItem[boardState.entities[overColumn][overIndex + 1]]?.indexColumn;
        const {reset: resetIndexColumn, value: indexColumn} = getnewIndexForDragDrop({indexList, prevIndex, nextIndex});
        if (indexColumn) {
          boardStore.updateState(state => {
            state.entitiesItem[activeId].indexColumn = indexColumn;
          });
          api.task.update({id: activeId, statusId: Number(overColumn), indexColumn, resetIndexColumn});
        }
      }
    },
    [boardState, boardStore]
  );

  return (
    <div className={style['kanban-container']}>
      <div className="inner">
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
          <SortableContext id="board" items={boardState.ids} strategy={horizontalListSortingStrategy}>
            {boardState.ids.map(id => (
              <KanbanColumn key={id} columnId={id} itemIds={boardState.entities[id]} />
            ))}
          </SortableContext>
          {activeItemId && (
            <DragOverlay>
              <KanbanTaskItem itemId={activeItemId} />
            </DragOverlay>
          )}
          {activeColumnId && (
            <DragOverlay>
              <KanbanColumn columnId={activeColumnId} itemIds={boardState.entities[activeColumnId]} />
            </DragOverlay>
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanContainer;
