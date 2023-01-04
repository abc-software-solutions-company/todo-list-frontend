/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import {DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {SetStateAction, useEffect, useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useBoards from '@/states/board/use-boards';
import {moveToColumn} from '@/utils/kanban/array';

import {apiUpdateTaskKanban, apiUpdateTaskStatus} from './api-handler';
import DNDCurrent from './type';

export default function useKanbanContainer() {
  const {statusList} = useBoards();

  const mapDataKanban = (statusList: IStatus[]) => {
    const boardDataMap: {[x: number]: ITaskResponse[]} = {};
    statusList.map(lists => {
      const columnData = {
        [lists.id]: lists.tasks
      };
      Object.assign(boardDataMap, columnData);
    });
    return boardDataMap;
  };

  const [boardState, setBoardState] = useState(() => mapDataKanban(statusList));
  const [taskActive, setTaskActive] = useState<ITaskResponse | any>();
  const [columnOrderState, setColumnOrderState] = useState<string[]>(statusList.map(e => e.id.toString()));
  const [columnActive, setColumnActive] = useState<string>();
  let boardUpdateDragEnd: SetStateAction<{[x: number]: ITaskResponse[]}>;

  useEffect(() => {
    setBoardState(() => mapDataKanban(statusList));
    setColumnOrderState(statusList.map(e => e.id.toString()));
  }, [statusList]);

  const sensors = useSensorGroup();

  const isColumnSelected = (id: UniqueIdentifier) => {
    return id.toString().includes('column') ? true : false;
  };

  const handleDragStart = ({active}: DragStartEvent) => {
    const {id, data} = active;
    if (isColumnSelected(id)) {
      setTaskActive(undefined);
      setColumnActive(id.toString().replace('column', ''));
    } else {
      setTaskActive(data.current);
      setColumnActive(undefined);
    }
  };

  const handleDragCancel = () => {
    setTaskActive(undefined);
    setColumnActive(undefined);
  };

  const handleDragOver = ({active, over}: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }

    // This is code for handle drag column
    if (columnActive) {
      const columnActive = active.id.toString().replace('column', '');
      const columnOver = over.data?.current?.statusId || over.id.toString().replace('column', '');
      if (columnActive != columnOver) {
        const columnActiveIndex = columnOrderState.findIndex(e => e == columnActive);
        const columnOverIndex = columnOrderState.findIndex(e => e == columnOver);
        const reorderColumnIdList = arrayMove(columnOrderState, columnActiveIndex, columnOverIndex);
        setColumnOrderState(reorderColumnIdList);
      }
    }

    // This is code for handle drag task
    if (columnActive == undefined) {
      const taskActiveColumn = active.data?.current?.statusId || active.id;
      const taskOverColumn = over.data?.current?.statusId || over.id.toString().replace('column', '');

      if (taskActiveColumn !== taskOverColumn) {
        const activeItem = active.data.current as ITaskResponse;
        const overIndex =
          over.id in boardState ? boardState[taskOverColumn].length : over.data.current?.sortable?.index;
        boardUpdateDragEnd = moveToColumn(boardState, taskActiveColumn, activeItem, taskOverColumn, overIndex);
        setBoardState(boardUpdateDragEnd);
      }
    }
  };

  // const handleDragEnd = ({active, over}: DragEndEvent) => {
  //   if (!over) {
  //     setTaskActive(undefined);
  //     return;
  //   }
  //   const activeColumn = active.data.current?.statusId || active.id;
  //   const activeItem = active.data.current as ITaskResponse;
  //   const activeIndex = active.data.current?.sortable.index || active.id;

  //   const overColumn = over.data.current?.statusId || over.id;
  //   const overIndex = over.data.current?.sortable.index || over.id;

  //   if (active.id !== over.id) {
  //     if (activeColumn !== overColumn) {
  //       arrangedBoard = {
  //         ...boardState,
  //         [overColumn]: arrayMove(boardState[overColumn], activeIndex, overIndex)
  //       };
  //       setBoardState(arrangedBoard);
  //       kanbanAPIHandler(arrangedBoard, activeItem, overColumn);
  //     } else {
  //       arrangedBoard = {
  //         ...boardState,
  //         [activeColumn]: arrayMove(boardState[activeColumn], activeIndex, overIndex)
  //       };
  //       setBoardState(arrangedBoard);
  //       kanbanAPIHandler(arrangedBoard, activeItem, overColumn);
  //     }
  //   } else {
  //     arrangedBoard = moveBetweenContainers(boardState, activeColumn, activeItem, overColumn, overIndex);
  //     setBoardState(arrangedBoard);
  //     kanbanAPIHandler(boardState, activeItem, overColumn);
  //   }
  // };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setTaskActive(undefined);
      setColumnActive(undefined);
      return;
    }
    if (over) {
      const overData: DNDCurrent | ITaskResponse | any = over.data.current;
      const activeData: DNDCurrent | ITaskResponse | any = active.data.current;
      const overContainerId = overData.sortable.containerId;
      alert(JSON.stringify(active));
      const activeContainerId = activeData.sortable.containerId;
      alert(activeContainerId);

      // const {id: overId, statusId: overStatusId, name: overName} = overData;
      // const {id: activeId, name: activeName} = activeData;
      const isDragBelowColumn = overData.name?.includes('column');

      if (!isDragBelowColumn && activeContainerId !== overContainerId) {
        alert('This task is drag to short column area');
        const newStatus = over.id.toString().replace('column', '');
        apiUpdateTaskStatus(activeData.id, parseInt(newStatus));
      }
      if (isDragBelowColumn && activeContainerId !== overContainerId) {
        console.log('This task is drag to column has overflow scroll or inside column');
        console.log('Active');
        console.log(active);
        console.log('Over');
        console.log(over);

        const beforePositionInColumn = activeData.sortable.index;
        const afterPositionInColumn = overData.sortable.index;
        // const allIdInColumn = overData.sortable.items;
        const overContainerId = overData.sortable.containerId;
        alert('Let move task id');

        setBoardState({
          ...boardState,
          [overContainerId]: arrayMove(
            boardState[Number(overContainerId)],
            beforePositionInColumn,
            afterPositionInColumn
          )
        });
        //This is where we check the task active position and task over position
        apiUpdateTaskStatus(activeData.id, parseInt(overData.statusId));
      }

      if (activeContainerId == overContainerId && !columnActive) {
        const beforePositionInColumn = activeData.sortable.index;
        const afterPositionInColumn = overData.sortable.index;
        alert('Let move task on the same column');
        setBoardState({
          ...boardState,
          [overContainerId]: arrayMove(
            boardState[Number(overContainerId)],
            beforePositionInColumn,
            afterPositionInColumn
          )
        });
        apiUpdateTaskKanban(boardState, activeData, activeContainerId);
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
    columnActive,
    columnOrderState
  };
}
