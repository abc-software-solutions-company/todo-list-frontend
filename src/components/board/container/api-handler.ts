/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {IndexStep} from '@/utils/constant';
import {getnewIndexForDragDrop} from '@/utils/function';

export const apiUpdateTaskKanban = (
  tasks: ITaskResponse[],
  taskIds: string[],
  activeTaskId: string,
  newStatus: number
) =>
  // tasks: ITaskResponse[],
  // taskIds: string[],
  // activeTaskId: string,
  // startColumnId: number,
  // overColumnId: number,
  // todolistId: string
  {
    if (!taskIds) {
      console.log('Update column have no task');
      console.log('🚀 ~ file: api-handler.ts:14 ~ newStatus', newStatus);

      // api.task.update({id: activeTaskId, indexColumn: IndexStep, statusId: newStatus}).then(socketUpdateList);
    } else {
      const activeTaskPosition = taskIds.findIndex(e => e == activeTaskId);
      console.log('🚀 ~ file: api-handler.ts:19 ~ activeTaskPosition', activeTaskPosition);

      // alert(JSON.stringify(taskIds));
      const listIndex = tasks.map(e => e.indexColumn);
      // console.log('🚀 ~ file: api-handler.ts:23 ~ listIndex', listIndex);
      // const activeTaskPosition = taskIds.findIndex(e => e === activeTaskId);
      // alert(activeTaskPosition);
      const preTaskId = taskIds[activeTaskPosition - 1];
      const nextTaskId = taskIds[activeTaskPosition + 1];
      const prevIndex = tasks.filter(e => e.id == preTaskId)[0]?.indexColumn;
      console.log('🚀 ~ file: api-handler.ts:34 ~ prevIndex', prevIndex);
      const nextIndex = tasks.filter(e => e.id == nextTaskId)[0]?.indexColumn;
      console.log('🚀 ~ file: api-handler.ts:36 ~ nextIndex', nextIndex);
      const newIndex = getnewIndexForDragDrop({listIndex, nextIndex, prevIndex});
      console.log('🚀 ~ file: api-handler.ts:31 ~ newIndex', newIndex);

      if (newIndex) {
        const {reset, value} = newIndex;
        api.task.update({id: activeTaskId, indexColumn: value, statusId: newStatus}).then(socketUpdateList);
      }
    }
  };

export const apiUpdateColumnKanban = (
  activeColumnId: number,
  arrangeColumn: string[],
  statusList: IStatus[],
  todoListId: string
) => {
  console.log('🚀 ~ file: api-handler.ts:50 ~ arrangeColumn', arrangeColumn);
  const activeColumnPosition = arrangeColumn.findIndex(x => x == activeColumnId.toString());

  const prevIndex = statusList.filter(x => x.id == Number(arrangeColumn[activeColumnPosition - 1]))[0]?.index;
  const nextIndex = statusList.filter(x => x.id == Number(arrangeColumn[activeColumnPosition + 1]))[0]?.index;
  const listIndex = statusList.map(e => e.index);

  const newIndex = getnewIndexForDragDrop({listIndex, nextIndex, prevIndex});
  if (newIndex) {
    const {value, reset} = newIndex;
    api.todolist
      .update({id: todoListId, statusId: activeColumnId, statusIndex: value, resetIndexStatus: reset})
      .then(socketUpdateList);
  }
};
