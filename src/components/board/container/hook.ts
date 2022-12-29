/* eslint-disable @typescript-eslint/no-shadow */
import {DragEndEvent, DragOverEvent, DragStartEvent} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {useEffect, useState} from 'react';

import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
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

  const apiUpdateTaskStatus = (id: string, statusId: number) => {
    api.task
      .update({id, statusId})
      .then(() => console.log('Update task column success'))
      .then(() => {
        socketUpdateList();
      });
  };

  const handleDragOver = ({active, over}: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }

    const activeContainer = active.data?.current?.statusId || active.id;
    const overContainer = over.data?.current?.statusId || over.id;

    if (activeContainer !== overContainer) {
      const activeItem = active.data.current as ITaskResponse;
      const overIndex = over.id in boardState ? boardState[overContainer].length : over.data.current?.sortable?.index;
      setBoardState(moveBetweenContainers(boardState, activeContainer, activeItem, overContainer, overIndex));
    }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setTaskActive(undefined);
      return;
    }

    const activeColumn = active.data.current?.sortable.containerId;
    const overColumn = over.data?.current?.statusId;
    if (activeColumn !== overColumn) {
      apiUpdateTaskStatus(active.id.toString(), overColumn);
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current?.statusId || active.id;
      const overContainer = over.data.current?.statusId || over.id;
      const activeIndex = active.data.current?.sortable.index || active.id;
      // const activeItem = active.data.current as ITaskResponse;
      const overIndex = over.data.current?.sortable.index || over.id;

      if (activeContainer !== overContainer)
        setBoardState({
          ...boardState,
          [overContainer]: arrayMove(boardState[overContainer], activeIndex, overIndex)
        });
      else {
        if (active.data != undefined)
          setBoardState({
            ...boardState,
            [activeContainer]: arrayMove(boardState[activeContainer], activeIndex, overIndex)
          });
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
