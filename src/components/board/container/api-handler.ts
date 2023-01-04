/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {getnewIndexForDragDrop} from '@/utils/function';

export const apiUpdateTaskKanban = (
  data: {[x: number]: ITaskResponse[]},
  activeTask: ITaskResponse,
  overColumnId: number
) => {
  const flatArrr: ITaskResponse[][] = [];
  Object.keys(data).map(x => {
    flatArrr.push(data[Number(x)]);
  });
  const listTask = flatArrr.flat(1);

  const listIndex = listTask.map(e => e.index);
  const statusId = overColumnId;

  let prevIndex: number;
  let nextIndex: number;

  const mergeTasks = flatArrr.flat(1);
  mergeTasks.forEach((task, idx) => {
    if (task.id == activeTask.id) {
      prevIndex = mergeTasks[idx - 1]?.index;
      nextIndex = mergeTasks[idx + 1]?.index;

      const newIndex = getnewIndexForDragDrop({listIndex, nextIndex, prevIndex});
      if (newIndex) {
        const {reset, value} = newIndex;
        api.task.update({id: task.id, index: value, statusId}).then(socketUpdateList);
      }
    }
  });
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
