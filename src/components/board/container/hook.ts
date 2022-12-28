/* eslint-disable @typescript-eslint/no-shadow */
import {DragEndEvent, DragOverEvent, DragStartEvent} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
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
      const activeItem = active.data.current as ITaskResponse;
      const overIndex =
        over.id in boardState ? boardState[overContainer].length + 1 : over.data.current?.sortable?.index;
      const placeholderData = () => {
        return moveBetweenContainers(boardState, activeContainer, activeItem, overContainer, overIndex);
      };
      setBoardState(placeholderData());
    }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setTaskActive(undefined);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current?.sortable.index;
      const activeItem = active.data.current as ITaskResponse;
      const overIndex = over.data.current?.sortable.index;

      if (activeContainer === overContainer) {
        setBoardState({
          ...boardState,
          [overContainer]: arrayMove(boardState[overContainer], activeIndex, overIndex)
        });
      } else {
        const kanbanData = moveBetweenContainers(boardState, activeContainer, activeItem, overContainer, overIndex);
        setBoardState(kanbanData);
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
    taskActive
  };
}
