/* eslint-disable @typescript-eslint/no-shadow */
import {DragEndEvent, DragOverEvent, DragStartEvent} from '@dnd-kit/core';
import {useEffect, useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useBoards from '@/states/board/use-boards';
import {arrayMove, moveBetweenContainers} from '@/utils/kanban/array';

export default function useKanbanContainer() {
  const {boardData, setBoard, statusList} = useBoards();

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
  const [taskActive, setTaskActive] = useState<ITaskResponse>();

  useEffect(() => {
    setBoardState(() => mapDataKanban(statusList));
  }, [statusList]);

  const sensors = useSensorGroup();

  // const apiUpdateTaskPosition = (activeTask: any, overTask: any) => {
  //   let newTaskIndex: number | undefined;
  //   let reindexAll = false;
  //   const limitDifferenceIndex = 32;
  //   const listIndex = boardData.tasks.map(e => e.index);
  //   const maxIndex = Math.max(...listIndex);
  //   const minIndex = Math.min(...listIndex);
  //   const taskBefore: ITaskResponse = activeTask;
  //   const taskAfter: ITaskResponse = overTask;

  //   if (!taskBefore || !taskAfter) {
  //     const taskNext = taskBefore || taskAfter;

  //     const indexNext = Number(taskNext.index);
  //     if (indexNext === minIndex) newTaskIndex = Math.round(minIndex / 2);
  //     if (indexNext === maxIndex) newTaskIndex = maxIndex + IndexStep;
  //     if (newTaskIndex && newTaskIndex <= limitDifferenceIndex) reindexAll = true;
  //   } else {
  //     const indexBefore = Number(taskBefore.index);
  //     const indexAfter = Number(taskAfter.index);
  //     newTaskIndex = Math.round((indexBefore + indexAfter) / 2);
  //     if (Math.abs(taskBefore.index - taskAfter.index) < limitDifferenceIndex * 2) reindexAll = true;
  //   }

  //   const resetIndex = () => {
  //     if (reindexAll) api.task.reindexAll({todolistId: boardData.id});
  //   };

  //   api.task
  //     .update({id: taskBefore.id, index: newTaskIndex, statusId: Number(statusActive)})
  //     .then(() => {
  //       console.log('Drag kanban success');
  //     })
  //     .then(() => setStatusActive(0))
  //     .then(socketUpdateList)
  //     .then(resetIndex);
  // };

  const handleDragStart = ({active}: DragStartEvent) => setTaskActive(active.data.current);

  const handleDragCancel = () => setTaskActive(undefined);

  const handleDragOver = ({active, over}: DragOverEvent) => {
    console.log('🚀 ~ file: hook.ts:77 ~ handleDragOver ~ over', over);
    console.log('🚀 ~ file: hook.ts:77 ~ handleDragOver ~ active', active);

    // const overId = over?.id;
    // if (!overId) {
    //   return;
    // }
    // const activeContainer = active.data.current?.sortable.containerId;
    // const overContainer = over.data.current?.sortable.containerId || over.id;
    // if (activeContainer !== overContainer) {
    //   console.log('Drag to other column');
    //   const updatePosition = (todolistKanban: {[x: string]: string | any[]}) => {
    //     const activeIndex = active.data.current?.sortable.index;
    //     const overIndex =
    //       over.id in todolistKanban ? todolistKanban[overContainer].length + 1 : over.data.current?.sortable.index;
    //     return moveBetweenContainers(todolistKanban, activeContainer, activeIndex, overContainer, overIndex, active.id);
    //   };
    //   setBoardState(updatePosition(boardState));
    // }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    console.log('🚀 ~ file: hook.ts:99 ~ handleDragEnd ~ over', over);
    console.log('🚀 ~ file: hook.ts:99 ~ handleDragEnd ~ active', active);
    // if (!over) {
    //   setTaskActive(undefined);
    //   return;
    // }
    // const taskKanbanActive = JSON.parse(active.id.toString());
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
