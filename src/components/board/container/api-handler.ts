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
  listID: string
) => {
  const activeColumnPosition = arrangeColumn.findIndex(x => x == activeColumnId.toString());
  let columnLeftPosition = 0;
  let columnRightPosition = 0;
  if (activeColumnPosition !== 0) {
    columnLeftPosition = activeColumnPosition - 1;
  }
  if (activeColumnPosition !== arrangeColumn.length - 1) {
    columnRightPosition = activeColumnPosition + 1;
  }

  const columnLeft = statusList.filter(x => x.id == Number(arrangeColumn[columnLeftPosition]))[0];
  const columnRight = statusList.filter(x => x.id == Number(arrangeColumn[columnRightPosition]))[0];

  let newIndex = 0;
  if (activeColumnPosition !== 0 && activeColumnPosition !== arrangeColumn.length - 1) {
    newIndex = (Number(columnLeft.index) + Number(columnRight.index)) / 2;
  }

  if (activeColumnPosition == 0) newIndex = Number(columnLeft.index) - Number(columnLeft.index / 2);

  if (activeColumnPosition == arrangeColumn.length - 1)
    newIndex = Number(columnRight.index) + Number(columnRight.index / 2);

  api.todolist.update({id: listID, statusId: activeColumnId, statusIndex: newIndex}).then(socketUpdateList);
};
