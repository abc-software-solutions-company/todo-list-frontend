/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {IndexStep} from '@/utils/constant';
import {getnewIndexForDragDrop} from '@/utils/function';

export const apiUpdateTaskKanban = (
  tasks: ITaskResponse[],
  activeTask: ITaskResponse,
  startColumnId: number,
  overColumnId: number,
  todolistId: string
) => {
 
    const activeTaskPosition = listTask.findIndex(x => x.id === activeTask.id);
    const prevIndex = listTask[activeTaskPosition - 1]?.indexColumn;
    const nextIndex = listTask[activeTaskPosition + 1]?.indexColumn;
    const newIndex = getnewIndexForDragDrop({listIndex, nextIndex, prevIndex});
    if (newIndex) {
      const {reset, value} = newIndex;
      api.task.update({id: activeTask.id, indexColumn: value, statusId: overColumnId}).then(socketUpdateList);
    }
    return;
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
