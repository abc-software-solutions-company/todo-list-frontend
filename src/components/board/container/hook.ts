/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import {DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {useEffect, useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useBoards from '@/states/board/use-boards';
import {moveBetweenContainers} from '@/utils/kanban/array';

import {apiUpdateTaskStatus, kanbanAPIHandler} from './api-handler';

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
  const [columnActive, setColumnActive] = useState<any>();

  useEffect(() => {
    setBoardState(() => mapDataKanban(statusList));
  }, [statusList]);

  const sensors = useSensorGroup();

  const isColumnSelected = (id: UniqueIdentifier) => {
    return id.toString().includes('column') ? true : false;
  };

  const handleDragStart = ({active}: DragStartEvent) => {
    const {data, id, rect} = active;
    console.log('🚀 ~ file: hook.ts:40 ~ handleDragStart ~ rect', rect);
    console.log('🚀 ~ file: hook.ts:40 ~ handleDragStart ~ id', id);
    console.log('🚀 ~ file: hook.ts:40 ~ handleDragStart ~ data', data);
    if (isColumnSelected(id)) {
      setTaskActive(undefined);
      setColumnActive(id.toString().replace('column', ''));
    } else {
      setTaskActive(active.data.current);
      setColumnActive(undefined);
    }
  };

  const handleDragCancel = () => {
    setTaskActive(undefined);
    setColumnActive(undefined);
  };

  const arrangedBoard = {};

  const handleDragOver = ({active, over}: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }
    console.log(active.data.current);

    console.log(isColumnSelected(active.id));

    // const activeColumn = active.data?.current?.statusId || active.id;
    // const overColumn = over.data?.current?.statusId || over.id;

    // if (activeColumn !== overColumn) {
    //   const activeItem = active.data.current as ITaskResponse;
    //   const overIndex = over.id in boardState ? boardState[overColumn].length : over.data.current?.sortable?.index;
    //   setBoardState(moveBetweenContainers(boardState, activeColumn, activeItem, overColumn, overIndex));
    // }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setTaskActive(undefined);
      setColumnActive(undefined);
      return;
    }
    // const activeColumn = active.data.current?.statusId || active.id;
    // const activeItem = active.data.current as ITaskResponse;
    // const activeIndex = active.data.current?.sortable.index || active.id;
    // const overColumn = over.data.current?.statusId || over.id;
    // const overIndex = over.data.current?.sortable.index || over.id;
    // if (active.id !== over.id) {
    //   if (activeColumn !== overColumn) {
    //     arrangedBoard = {
    //       ...boardState,
    //       [overColumn]: arrayMove(boardState[overColumn], activeIndex, overIndex)
    //     };
    //     setBoardState(arrangedBoard);
    //     kanbanAPIHandler(arrangedBoard, activeItem, overColumn);
    //   } else {
    //     arrangedBoard = {
    //       ...boardState,
    //       [activeColumn]: arrayMove(boardState[activeColumn], activeIndex, overIndex)
    //     };
    //     setBoardState(arrangedBoard);
    //     kanbanAPIHandler(arrangedBoard, activeItem, overColumn);
    //   }
    // } else {
    //   arrangedBoard = moveBetweenContainers(boardState, activeColumn, activeItem, overColumn, overIndex);
    //   setBoardState(arrangedBoard);
    //   kanbanAPIHandler(boardState, activeItem, overColumn);
    // }
  };

  return {
    boardData: boardState,
    sensors,
    isColumnSelected,
    statusList,
    handleDragStart,
    handleDragCancel,
    handleDragEnd,
    handleDragOver,
    taskActive,
    columnActive
  };
}
