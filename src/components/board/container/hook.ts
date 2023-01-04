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

import {apiUpdateColumnKanban, apiUpdateTaskKanban, apiUpdateTaskStatus} from './api-handler';
import DNDCurrent from './type';

export default function useKanbanContainer() {
  const {statusList, boardData} = useBoards();

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
  const [columnDragActive, setColumnDragActive] = useState<string>();
  const [overColumnActive, setOverColumnActive] = useState<number>(0);
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
      setColumnDragActive(id.toString().replace('column', ''));
    } else {
      setTaskActive(data.current);
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
      const columnDragActive = active.id.toString().replace('column', '');
      const columnOver = over.data?.current?.statusId || over.id.toString().replace('column', '');
      if (columnDragActive != columnOver) {
        const columnActiveIndex = columnOrderState.findIndex(e => e == columnDragActive);
        const columnOverIndex = columnOrderState.findIndex(e => e == columnOver);
        const reorderColumnIdList = arrayMove(columnOrderState, columnActiveIndex, columnOverIndex);
        setColumnOrderState(reorderColumnIdList);
      }
    }

    // This is code for handle drag task
    if (columnDragActive == undefined) {
      const taskActiveColumn = active.data?.current?.statusId || active.id;
      const taskOverColumn = over.data?.current?.statusId || over.id.toString().replace('column', '');

      if (taskActiveColumn !== taskOverColumn) {
        const activeItem = active.data.current as ITaskResponse;
        const overIndex =
          over.id in boardState ? boardState[taskOverColumn].length : over.data.current?.sortable?.index;
        boardUpdateDragEnd = moveToColumn(boardState, taskActiveColumn, activeItem, taskOverColumn, overIndex);
        setBoardState(boardUpdateDragEnd);
        setOverColumnActive(taskOverColumn);
      }
    }
  };

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setTaskActive(undefined);
      setColumnDragActive(undefined);
      return;
    }
    if (over) {
      const overData: DNDCurrent | ITaskResponse | any = over.data.current;
      const activeData: DNDCurrent | ITaskResponse | any = active.data.current;
      const activeColumnId = activeData.sortable.containerId;

      if (activeColumnId !== overColumnActive) {
        alert(`over column is different`);
        apiUpdateTaskStatus(active.id, overColumnActive);
      }

      if (activeColumnId == overColumnActive && !columnDragActive) {
        const beforePositionInColumn = activeData.sortable.index;
        const afterPositionInColumn = overData.sortable.index;
        alert('Let move task on the same column');
        setBoardState({
          ...boardState,
          [overColumnActive]: arrayMove(
            boardState[Number(overColumnActive)],
            beforePositionInColumn,
            afterPositionInColumn
          )
        });
        apiUpdateTaskKanban(boardState, activeData, activeColumnId);
      }
    }
    if (columnDragActive) {
      const activeColumnId = Number(active.id.toString().replace('column', ''));
      const listID = boardData.id;
      apiUpdateColumnKanban(activeColumnId, columnOrderState, statusList, listID);
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
