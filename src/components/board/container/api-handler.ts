/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';

// export const apiUpdateTaskStatus = (id: string, statusId: number) => {
//   api.task
//     .update({id, statusId})
//     .then(() => console.log('Update task column success'))
//     .then(() => {
//       socketUpdateList();
//     })
//     .then(() => {
//       console.log('Change status ok');
//     });
// };

export const apiUpdateTaskKanban = (
  data: {[x: number]: ITaskResponse[]},
  activeTask: ITaskResponse,
  statusId: number
) => {
  const flatArrr: ITaskResponse[][] = [];
  Object.keys(data).map(x => {
    flatArrr.push(data[Number(x)]);
  });

  const mergeTasks = flatArrr.flat(1);
  mergeTasks.forEach((task, idx) => {
    if (task.id == activeTask.id) {
      console.log(task);
      const taskBefore = idx == 0 ? mergeTasks[mergeTasks.length - 1] : mergeTasks[idx - 1];
      console.log('🚀 ~ file: api-handler.ts:31 ~ mergeTasks.forEach ~ taskBefore', taskBefore);
      const taskAfter = idx == mergeTasks.length - 1 ? mergeTasks[0] : mergeTasks[idx];
      console.log('🚀 ~ file: api-handler.ts:33 ~ mergeTasks.forEach ~ taskAfter', taskAfter);
      alert(taskBefore.index);
      alert('Task Index after');
      alert(taskAfter.index);
      const newTaskIndex = (Number(taskBefore.index) + Number(taskAfter.index)) / 2;
      alert('New Task Index');
      alert(newTaskIndex);
      api.task.update({id: activeTask.id, index: parseInt(newTaskIndex.toString()), statusId}).then(socketUpdateList);
    }
  });
};
