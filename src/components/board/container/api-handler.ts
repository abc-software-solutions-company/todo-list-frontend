import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';
import {getnewIndexForDragDrop} from '@/utils/function';

export const apiUpdateTaskStatus = (id: string, statusId: number) => {
  api.task
    .update({id, statusId})
    .then(() => console.log('Update task column success'))
    .then(() => {
      socketUpdateList();
    })
    .then(() => {
      console.log('Change status ok');
    });
};

export const apiUpdateTaskKanban = (
  data: {[x: number]: ITaskResponse[]},
  activeTask: ITaskResponse,
  overColumnId: number
) => {
  const flatArrr: ITaskResponse[][] = [];
  Object.keys(data).map(x => {
    flatArrr.push(data[Number(x)]);
  });

  const statusId = overColumnId;

  const mergeTasks = flatArrr.flat(1);
  mergeTasks.forEach((task, idx) => {
    if (task.id == activeTask.id) {
      const taskBefore = idx == 0 ? mergeTasks[mergeTasks.length - 1] : mergeTasks[idx - 1];
      const taskAfter = idx == mergeTasks.length - 1 ? mergeTasks[0] : mergeTasks[idx + 1];
      const newTaskIndex = (Number(taskBefore.index) + Number(taskAfter.index)) / 2;
      api.task.update({id: task.id, index: parseInt(newTaskIndex.toString()), statusId}).then(socketUpdateList);
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
