/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import {DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {useEffect, useState} from 'react';

import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {useSensorGroup} from '@/lib/dnd-kit/sensor/sensor-group';
import useBoards from '@/states/board/use-boards';
import {moveToColumn} from '@/utils/kanban/array';

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
      const activeColumn = active.data?.current?.statusId || active.id;
      const overColumn = over.data?.current?.statusId || over.id.toString().replace('column', '');
      console.log('🚀 ~ file: hook.ts:80 ~ handleDragOver ~ overColumn', overColumn);

      if (activeColumn !== overColumn) {
        const activeItem = active.data.current as ITaskResponse;
        let overIndex;
        console.log(over.id);
        if (over.id.toString().includes('column')) {
          setBoardState(moveToColumn(boardState, activeColumn, activeItem, overColumn, boardState[overColumn].length));
        } else {
          overIndex = over.id in boardState ? boardState[overColumn].length : over.data.current?.sortable?.index;
          setBoardState(moveToColumn(boardState, activeColumn, activeItem, overColumn, overIndex));
        }
      }
    }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setTaskActive(undefined);
      setColumnActive(undefined);
      return;
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
