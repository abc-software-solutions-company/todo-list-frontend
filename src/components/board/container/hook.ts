/* eslint-disable @typescript-eslint/no-shadow */
import {DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {useEffect, useState} from 'react';

import {IStatus} from '@/data/api/types/todolist.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useBoards from '@/states/board/use-boards';
import {moveBetweenContainers} from '@/utils/kanban/array';

import {apiUpdateColumnKanban, apiUpdateTaskKanban} from './api-handler';

export default function useKanbanContainer() {
  const {statusList, boardData} = useBoards();
  const {tasks} = boardData;
  const todolistId = boardData.id;

  const mapDataKanban = (statusList: IStatus[]) => {
    const boardDataMap: {[x: number]: string[]} = {};
    statusList.map(lists => {
      const columnData = {
        [lists.id]: lists.tasks?.map(e => e.id)
      };
      Object.assign(boardDataMap, columnData);
    });
    return boardDataMap;
  };

  const [boardState, setBoardState] = useState(() => mapDataKanban(statusList));
  const [taskActive, setTaskActive] = useState<UniqueIdentifier>();
  const [columnOrderState, setColumnOrderState] = useState<string[]>(statusList.map(e => e.id.toString()));
  const [columnDragActive, setColumnDragActive] = useState<string>();
  const [overColumnId, setOverColumnId] = useState<number>(0);

  useEffect(() => {
    setBoardState(() => mapDataKanban(statusList));
    setColumnOrderState(statusList.map(e => e.id.toString()));
  }, [statusList]);

  const sensors = useSensorGroup();

  const isColumnSelected = (id: UniqueIdentifier) => {
    return id.toString().includes('column') ? true : false;
  };

  const handleDragStart = ({active}: DragStartEvent) => {
    const {id} = active;
    if (isColumnSelected(id)) {
      setTaskActive(undefined);
      setColumnDragActive(id.toString().replace('column', ''));
    } else {
      setTaskActive(id);
      setColumnDragActive(undefined);
    }
  };

  const handleDragCancel = () => {
    setTaskActive(undefined);
    setColumnDragActive(undefined);
  };

  const handleDragOver = ({active, over}: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }

    // This is code for handle drag column
    if (columnDragActive) {
      const IdColumnSelected = active.id.toString().replace('column', '');
      const columnOver = over.data?.current?.statusId || over.id.toString().replace('column', '');
      if (IdColumnSelected != columnOver) {
        const columnActiveIndex = columnOrderState.findIndex(e => e == IdColumnSelected);
        const columnOverIndex = columnOrderState.findIndex(e => e == columnOver);
        const reorderColumnIdList = arrayMove(columnOrderState, columnActiveIndex, columnOverIndex);
        setColumnOrderState(reorderColumnIdList);
      }
    }

    // This is code for handle drag task
    if (columnDragActive == undefined) {
      const activeContainer = active.data.current?.sortable.containerId;
      let overContainer = over.data.current?.sortable.containerId;
      if (overContainer === 'drag-column') overContainer = over.id.toString().replace('column', '');

      if (activeContainer !== overContainer && boardState[overContainer]) {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          over.id in boardState ? boardState[overContainer].length + 1 : over.data.current?.sortable.index;

        const newBoardState = moveBetweenContainers(
          boardState,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );

        setBoardState(newBoardState);
        setOverColumnId(overContainer);
      }
    }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    let newBoardState = undefined;

    if (!over) {
      setTaskActive(undefined);
      setColumnDragActive(undefined);
      return;
    }
    const activeContainer = active.data.current?.sortable.containerId;
    let overContainer = over.data.current?.sortable.containerId;
    if (overContainer === 'drag-column') overContainer = over.id.toString().replace('column', '');
    if (over) {
      if (columnDragActive) {
        const activeColumnId = Number(active.id.toString().replace('column', ''));
        apiUpdateColumnKanban(activeColumnId, columnOrderState, statusList, todolistId);
        return;
      }

      if (active.id !== over.id) {
        const activeIndex = active.data.current?.sortable.index;
        const overIndex =
          over.id in boardState
            ? boardState[overContainer] !== undefined
              ? boardState[overContainer].length + 1
              : 1
            : over.data.current?.sortable.index;

        if (activeContainer === overContainer) {
          newBoardState = {
            ...boardState,
            [overContainer]: arrayMove(boardState[overContainer], activeIndex, overIndex)
          };
        } else {
          if (overContainer !== undefined) {
            newBoardState = moveBetweenContainers(
              boardState,
              activeContainer,
              activeIndex,
              overContainer,
              overIndex,
              active.id
            );
          } else newBoardState = boardState;
        }
        setBoardState(newBoardState);
      }

      if (newBoardState) {
        const newStatus = overContainer > 0 ? overContainer : overColumnId;
        apiUpdateTaskKanban(tasks, newBoardState[overContainer], active.id.toString(), newStatus);
      } else {
        const oldStatus = activeContainer;
        apiUpdateTaskKanban(tasks, boardState[activeContainer], active.id.toString(), oldStatus);
      }
    }
  };

  return {
    boardData: boardState,
    sensors,
    statusList,
    handleDragStart,
    handleDragCancel,
    handleDragEnd,
    handleDragOver,
    taskActive,
    columnDragActive,
    columnOrderState
  };
}
