import {Active, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, Over} from '@dnd-kit/core';
import {arrayMove, horizontalListSortingStrategy, SortableContext} from '@dnd-kit/sortable';
import React, {FC, useEffect, useState} from 'react';

import api from '@/data/api';
import {IStatus} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {useBoardState} from '@/hooks/useBoardState';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useBoards from '@/states/board/use-boards';
import useFilter from '@/states/filter/use-filter';
import {Priorities} from '@/utils/constant';
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
  const {priorityFilterInList, assigneeFilterInList} = useFilter();

  const [boardState, setBoardState] = useState<BoardState>({ids: [], entities: {}});
  const [activeItemId, setActiveItemId] = useState<string>();
  const [activeColumnId, setActiveColumnId] = useState<string>();
  const [needUpdate, setNeedUpdate] = useState(false);

  useEffect(() => {
    const newStatusList: IStatus[] = [];
    const prioritiesList = Object.values(Priorities).reverse();
    const prioritieValue = prioritiesList.includes(priorityFilterInList) ? priorityFilterInList : '';
    statusList.map(a =>
      newStatusList.push({
        id: a.id,
        backgroundColor: a.backgroundColor,
        index: a.index,
        name: a.name,
        color: a.color,
        tasks: a.tasks?.filter(e => {
          if (assigneeFilterInList == 'Unassigned' && prioritieValue)
            return e.assignees.length == 0 && e.priority == prioritieValue;
          if (prioritieValue && assigneeFilterInList != 'default')
            return e.priority == prioritieValue && e.assignees[0]?.userId == assigneeFilterInList;
          if (prioritieValue) return e.priority == prioritieValue;
          if (assigneeFilterInList == 'Unassigned') {
            return e.assignees.length == 0;
          } else if (assigneeFilterInList != 'default') {
            return e.assignees[0]?.userId == assigneeFilterInList;
          }
          return e;
        })
      })
    );
    boardStore.generateState(newStatusList);
    setNeedUpdate(true);
  }, [statusList, priorityFilterInList, assigneeFilterInList]);
  useEffect(() => {
    if (needUpdate) {
      const entities: BoardState['entities'] = {};
      const ids = boardStore.ids.map(key => {
        entities[key] = boardStore.entitiesColumn[key].ids;
        return key;
      });
      setNeedUpdate(false);
      setBoardState({ids, entities});
    }
  }, [needUpdate, boardStore]);

  const getDragData = ({active, over}: {active: Active; over: Over | null}) => {
    if (!over?.id) return null;
    const activeId = active.id as string;
    const activeColumn = active.data.current?.sortable?.containerId as string | undefined;
    const overId = over.id as string;
    const overContainerId = over?.data.current?.sortable?.containerId as string | undefined;
    const overColumn = activeColumn !== 'board' ? (overContainerId === 'board' ? overId : overContainerId) : 'board';
    if (!activeColumn || !overColumn) return null;
    const activeIndex = active?.data.current?.sortable?.index as number | undefined;
    const overIndex = over?.data.current?.sortable?.index as number | undefined;
    if (overIndex === undefined || activeIndex === undefined || overIndex < 0) return null;
    return {activeColumn, overColumn, activeIndex, overIndex, activeId, overId};
  };

  const onDragStart = ({active}: DragStartEvent) =>
    active.data.current?.sortable?.containerId === 'board'
      ? setActiveColumnId(active.id as string)
      : setActiveItemId(active.id as string);

  const onDragCancel = () => {
    setActiveItemId(undefined);
    setActiveColumnId(undefined);
  };
  const onDragOver = ({active, over}: DragOverEvent) => {
    const dragData = getDragData({active, over});
    if (!dragData) return;
    const {activeColumn, overColumn, overIndex, activeId} = dragData;
    if (activeColumn === overColumn) return;
    const newEntities = {...boardState.entities};
    newEntities[activeColumn] = newEntities[activeColumn].filter(e => e !== activeId);
    const overEntity = newEntities[overColumn];
    newEntities[overColumn] = [...overEntity.slice(0, overIndex), activeId, ...overEntity.slice(overIndex)];
    setBoardState({...boardState, entities: newEntities});
  };

  const onDragEnd = ({active, over}: DragEndEvent) => {
    onDragCancel();
    const dragData = getDragData({active, over});
    if (!dragData) return;
    const {activeColumn, overColumn, activeIndex, overIndex, activeId} = dragData;
    //move column
    if (activeColumn === 'board' && overColumn === 'board') {
      const indexList = boardState.ids
        .filter(e => e !== activeId)
        .map(e => Number(boardStore.entitiesColumn[e].status.index));
      const newIds = arrayMove(boardState.ids, activeIndex, overIndex);
      setBoardState({...boardState, ids: newIds});
      const prevIndex = boardStore.entitiesColumn[newIds[overIndex - 1]]?.status.index;
      const nextIndex = boardStore.entitiesColumn[newIds[overIndex + 1]]?.status.index;
      const {reset: resetIndexStatus, value: statusIndex} = getnewIndexForDragDrop({indexList, prevIndex, nextIndex});
      if (statusIndex) {
        boardStore.updateState(state => {
          state.entitiesColumn[activeId].status.index = statusIndex;
        });
        api.todolist
          .update({id: listID, statusId: Number(activeId), statusIndex, resetIndexStatus})
          .then(socketUpdateList);
      }
    }
    // move item
    else if (activeColumn === overColumn) {
      const newEntities = {...boardState.entities};
      const indexList = boardState.entities[overColumn]
        .filter(e => e !== activeId)
        .map(e => Number(boardStore.entitiesItem[e].indexColumn));
      newEntities[activeColumn] = arrayMove(newEntities[activeColumn], activeIndex, overIndex);
      setBoardState({...boardState, entities: newEntities});
      const prevIndex = boardStore.entitiesItem[newEntities[overColumn][overIndex - 1]]?.indexColumn;
      const nextIndex = boardStore.entitiesItem[newEntities[overColumn][overIndex + 1]]?.indexColumn;
      const {reset: resetIndexColumn, value: indexColumn} = getnewIndexForDragDrop({indexList, prevIndex, nextIndex});
      if (indexColumn) {
        boardStore.updateState(state => {
          state.entitiesItem[activeId].indexColumn = indexColumn;
        });
        api.task
          .update({id: activeId, statusId: Number(overColumn), indexColumn, resetIndexColumn})
          .then(socketUpdateList);
      }
    }
  };

  return (
    <div className={style['kanban-container']}>
      <div className="inner">
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}>
          <SortableContext id="board" items={boardState.ids} strategy={horizontalListSortingStrategy}>
            {boardState.ids.map((id, i) => (
              <KanbanColumn
                key={id + i}
                columnId={id}
                itemIds={boardState.entities[id]}
                showHeader={i + 1 !== boardState.ids.length}
              />
            ))}
          </SortableContext>
          {activeItemId && (
            <DragOverlay>
              <KanbanTaskItem itemId={activeItemId} />
            </DragOverlay>
          )}
          {activeColumnId && (
            <DragOverlay>
              <KanbanColumn
                columnId={activeColumnId}
                itemIds={boardState.entities[activeColumnId]}
                showHeader={false}
              />
            </DragOverlay>
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanContainer;
