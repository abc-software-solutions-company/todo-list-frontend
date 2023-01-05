/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {IndexStep} from '@/utils/constant';
import {getnewIndexForDragDrop} from '@/utils/function';

export const apiUpdateTaskKanban = (
  data: {[x: number]: ITaskResponse[]},
  activeTask: ITaskResponse,
  overColumnId: number,
  todolistId: string
) => {
  const listIndex = data[overColumnId].map(e => e.indexColumn);
  if (listIndex.length == 0) {
    const indexColumn = IndexStep;
    api.task.update({id: activeTask.id, statusId: overColumnId, indexColumn}).then(socketUpdateList);
  }
  if (listIndex.length > 0 && activeTask.statusId == overColumnId) {
    const listTask = data[overColumnId];
    console.log('🚀 ~ file: api-handler.ts:23 ~ listTask', listTask);
    const activeTaskPosition = listTask.findIndex(x => x.id === activeTask.id);
    console.log('🚀 ~ file: api-handler.ts:24 ~ activeTaskPosition', activeTaskPosition);
    const prevIndex = listTask[activeTaskPosition - 1]?.indexColumn;
    console.log('🚀 ~ file: api-handler.ts:25 ~ prevIndex', prevIndex);
    const nextIndex = listTask[activeTaskPosition + 1]?.indexColumn;
    console.log('🚀 ~ file: api-handler.ts:27 ~ nextIndex', nextIndex);

    const newIndex = getnewIndexForDragDrop({listIndex, nextIndex, prevIndex});
    if (newIndex) {
      const {reset, value} = newIndex;
      console.log('🚀 ~ file: api-handler.ts:32 ~ value', value);
      api.task.update({id: activeTask.id, indexColumn: value, statusId: overColumnId}).then(socketUpdateList);
    }
  }

  if (listIndex.length > 0 && activeTask.statusId !== overColumnId) {
    alert('Drag task to other column');
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
