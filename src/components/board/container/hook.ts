/* eslint-disable @typescript-eslint/no-unused-expressions */
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

  let arrangedBoard = {};

  const handleDragOver = ({active, over}: DragOverEvent) => {
    const overId = over?.id;
    if (!overId) {
      return;
    }

    // This is code for handle drag column
    if (columnActive) {
      console.log(boardState);

      const columnActive = active.id.toString().replace('column', '');
      const columnOver = over.data?.current?.statusId || over.id.toString().replace('column', '');
      if (columnActive != columnOver) {
        const columnIdList = active.data?.current?.sortable.items as string[];
        const columnActiveIndex = columnIdList.findIndex(e => e == columnActive);
        console.log('🚀 ~ file: hook.ts:77 ~ handleDragOver ~ columnActiveIndex', columnActiveIndex);
        const columnOverIndex = columnIdList.findIndex(e => e == columnOver);
        console.log('🚀 ~ file: hook.ts:79 ~ handleDragOver ~ columnOverIndex', columnOverIndex);
        const reorderColumnIdList = arrayMove(columnIdList, columnActiveIndex, columnOverIndex);
        console.log('🚀 ~ file: hook.ts:84 ~ handleDragOver ~ reorderColumnIdList', reorderColumnIdList);
        const boardDataMap: {[x: number]: ITaskResponse[]} = {};
        reorderColumnIdList.map(e => {
          const columnData = {
            [e]: boardState[Number(e)]
          };
          Object.assign(boardDataMap, columnData);
        });
        console.log('🚀 ~ file: hook.ts:85 ~ handleDragOver ~ boardDataMap', boardDataMap);

        // setBoardState(boardDataMap);
        // const updateColumnPosition = arrayMove(boardState, columnActiveIndex, columnOverIndex);
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
        // const overIndex = over.id in boardState ? boardState[overColumn].length : over.data.current?.sortable?.index;
        // console.log('🚀 ~ file: hook.ts:84 ~ handleDragOver ~ overIndex', overIndex);
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
    if (columnActive == undefined) {
      const activeColumn = active.data.current?.statusId || active.id;
      const activeItem = active.data.current as ITaskResponse;
      const activeIndex = active.data.current?.sortable.index || active.id;
      const overColumn = over.data.current?.statusId || over.id.toString().replace('column', '');
      const overIndex = over.data.current?.sortable.index || over.id.toString().replace('column', '');
      if (active.id !== over.id && activeItem !== undefined) {
        if (activeColumn !== overColumn) {
          arrangedBoard = {
            ...boardState,
            [overColumn]: arrayMove(boardState[overColumn], activeIndex, overIndex)
          };
          setBoardState(arrangedBoard);
          kanbanAPIHandler(arrangedBoard, activeItem, overColumn);
        } else {
          arrangedBoard = {
            ...boardState,
            [activeColumn]: arrayMove(boardState[activeColumn], activeIndex, overIndex)
          };
          setBoardState(arrangedBoard);
          kanbanAPIHandler(arrangedBoard, activeItem, overColumn);
        }
      } else {
        arrangedBoard = moveToColumn(boardState, activeColumn, activeItem, overColumn, overIndex);
        setBoardState(arrangedBoard);
        kanbanAPIHandler(boardState, activeItem, overColumn);
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
    columnActive
  };
}
