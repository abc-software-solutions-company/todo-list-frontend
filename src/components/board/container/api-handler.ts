import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {IStatus} from '@/data/api/types/todolist.type';
import {socketUpdateList} from '@/data/socket';

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
      console.log(task);
      const taskBefore = idx == 0 ? mergeTasks[mergeTasks.length - 1] : mergeTasks[idx - 1];
      console.log('🚀 ~ file: api-handler.ts:31 ~ mergeTasks.forEach ~ taskBefore', taskBefore);
      const taskAfter = idx == mergeTasks.length - 1 ? mergeTasks[0] : mergeTasks[idx];
      console.log('🚀 ~ file: api-handler.ts:33 ~ mergeTasks.forEach ~ taskAfter', taskAfter);
      const newTaskIndex = (Number(taskBefore.index) + Number(taskAfter.index)) / 2;
      console.log(newTaskIndex);
      api.task.update({id: task.id, index: parseInt(newTaskIndex.toString()), statusId}).then(socketUpdateList);
    }
  });
};

export const apiUpdateColumnKanban = (
  activeColumnId: number,
  arrangeColumn: string[],
  statusList: IStatus[],
  listID: string
) => {
  const activeColumnPosition = arrangeColumn.findIndex(x => x == activeColumnId.toString());
  const columnLeftPosition = activeColumnPosition == 0 ? arrangeColumn.length - 1 : activeColumnPosition - 1;
  const columnRightPosition = activeColumnPosition == arrangeColumn.length - 1 ? 0 : activeColumnPosition + 1;

  const columnLeft = statusList.filter(x => x.id == Number(arrangeColumn[columnLeftPosition]))[0];
  // const columnActive = statusList.filter(x => x.id == activeColumnId);
  const columnRight = statusList.filter(x => x.id == Number(arrangeColumn[columnRightPosition]))[0];

  const newIndex = (Number(columnLeft.index) + Number(columnRight.index)) / 2;

  api.todolist.update({id: listID, statusId: activeColumnId, statusIndex: newIndex});
};
