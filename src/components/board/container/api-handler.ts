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
) => {
  if (!taskIds) {
    api.task.update({id: activeTaskId, indexColumn: IndexStep, statusId: newStatus}).then(socketUpdateList);
  } else {
    const activeTaskPosition = taskIds.findIndex(e => e == activeTaskId);
    console.log('🚀 ~ file: api-handler.ts:19 ~ activeTaskPosition', activeTaskPosition);

    const listIndex = tasks.map(e => e.indexColumn);

    const preTaskId = taskIds[activeTaskPosition - 1];
    const nextTaskId = taskIds[activeTaskPosition + 1];

    const prevIndex = tasks.filter(e => e.id == preTaskId)[0]?.indexColumn;
    const nextIndex = tasks.filter(e => e.id == nextTaskId)[0]?.indexColumn;

    const newIndex = getnewIndexForDragDrop({listIndex, nextIndex, prevIndex});

    if (newIndex) {
      const {reset, value} = newIndex;
      api.task
        .update({id: activeTaskId, indexColumn: value, statusId: newStatus, resetIndexColumn: reset})
        .then(socketUpdateList);
    }
  }
};

export const apiUpdateColumnKanban = (
  activeColumnId: number,
  arrangeColumn: string[],
  statusList: IStatus[],
  todoListId: string
) => {
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
