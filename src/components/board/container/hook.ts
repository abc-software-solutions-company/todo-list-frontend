/* eslint-disable @typescript-eslint/no-shadow */
import {DragEndEvent, DragOverEvent, DragStartEvent} from '@dnd-kit/core';
import {useEffect, useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useBoards from '@/states/board/use-boards';
import {moveBetweenContainers} from '@/utils/kanban/array';

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

  useEffect(() => {
    setBoardState(() => mapDataKanban(statusList));
  }, [statusList]);

  const sensors = useSensorGroup();

  const handleDragStart = ({active}: DragStartEvent) => setTaskActive(active.data.current);

  const handleDragCancel = () => setTaskActive(undefined);

  const handleDragOver = ({active, over}: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }
    const activeContainer = active.data?.current?.statusId || active.id;
    const overContainer = over.data?.current?.statusId || over.id;

    if (activeContainer !== overContainer) {
      console.log(`Active Column is ${active.data?.current?.statusId}`);
      console.log(`Over Column is ${over.data?.current?.statusId || over.id}`);
      console.log('Drag to other column');
      console.log(`Find active index  `);
      const activeItem = active.data.current as ITaskResponse;
      const overIndex =
        over.id in boardState ? boardState[overContainer].length + 1 : over.data.current?.sortable?.index;
      const placeholderData = () => {
        return moveBetweenContainers(boardState, activeContainer, activeItem, overContainer, overIndex);
      };
      console.log('🚀 ~ file: hook.ts:53 ~ handleDragOver ~ overIndex', overIndex);

      // console.log('🚀 ~ file: hook.ts:55 ~ placeholderData ~ placeholderData', placeholderData());
      setBoardState(placeholderData());
    }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    console.log('🚀 ~ file: hook.ts:99 ~ handleDragEnd ~ over', over?.data);
    console.log('🚀 ~ file: hook.ts:99 ~ handleDragEnd ~ active', active.data);
    if (!over) {
      setTaskActive(undefined);
      return;
    }
    // if (active.id !== over.id) {
    //   // const taskKanbanOver = JSON.parse(over.id.toString());
    //   console.log('Drag on the same column');
    //   const activeContainer = active.data.current?.sortable.containerId;
    //   const overContainer = over.data.current?.sortable.containerId || over.id;
    //   const activeIndex = active.data.current?.sortable.index;
    //   const overIndex = over.id in boardData ? boardData[overContainer].length + 1 : over.data.current?.sortable.index;
    //   let newItems;
    //   const updatePosition = (todolistKanban: {[x: string]: any}) => {
    //     if (activeContainer === overContainer) {
    //       newItems = {
    //         ...todolistKanban,
    //         [overContainer]: arrayMove(todolistKanban[overContainer], activeIndex, overIndex)
    //       };
    //     } else {
    //       newItems = moveBetweenContainers(
    //         todolistKanban,
    //         activeContainer,
    //         activeIndex,
    //         overContainer,
    //         overIndex,
    //         active.id
    //       );
    //     }
    //     return newItems;
    //   };
    //   setBoardState(updatePosition(boardState));
    //   setBoard(updatePosition(boardState));
    //   // setStatusActive(statusList.filter(e => e.name == activeContainer)[0].id);
    //   // apiUpdateTaskPosition(taskKanbanActive, taskKanbanOver);
    // } else {
    //   // const taskKanbanActive = JSON.parse(active.id.toString());
    //   // apiUpdateTaskPosition(taskKanbanActive, null);
    // }
  };

  return {
    boardData: boardState,
    sensors,
    statusList,
    handleDragStart,
    handleDragCancel,
    handleDragEnd,
    handleDragOver,
    taskActive
  };
}
