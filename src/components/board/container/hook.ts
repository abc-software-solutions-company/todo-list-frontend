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

import {apiUpdateTaskStatus} from './api-handler';
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

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (!over) {
      setTaskActive(undefined);
      setColumnActive(undefined);
      return;
    }
    if (over) {
      const overData: DNDCurrent = over.data.current;
      const activeData: DNDCurrent = active.data.current;

      const {id: overId, statusId: overStatusId, name: overName} = overData;
      const {id: activeId, name: activeName} = activeData;

      if (!overName) {
        console.log('This task is drag to short column area');
        const newStatus = over.id.toString().replace('column', '');
        // apiUpdateTaskStatus(activeId, parseInt(newStatus));
      }
      if (overName) {
        console.log('This task is drag to column has overflow scroll or inside column');
        // console.log(over);
        // console.log('Active data id');
        // console.log(activeData.id);
        // console.log(`Active Data Sortable`);
        // console.log(active);

        // console.log('Over data id');
        // console.log(overData.id);

        // console.log('Over sotrable items');
        // console.log(overData.sortable.items);
        // const columnIdArr = overData.sortable.items;
        console.log('Active');
        console.log(active);
        console.log('Over');
        console.log(over);

        const beforePositionInColumn = activeData.sortable.index;
        const afterPositionInColumn = overData.sortable.index;
        const allIdInColumn = overData.sortable.items;
        console.log('Let move task id');
        console.log(arrayMove(allIdInColumn, beforePositionInColumn, afterPositionInColumn));

        // console.log(arrayMove(columnIdArr));

        // This is where we check the task active position and task over position

        // apiUpdateTaskStatus(activeId, parseInt(overStatusId));
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
