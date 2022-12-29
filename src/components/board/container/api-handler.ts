/* eslint-disable @typescript-eslint/no-unused-vars */
import api from '@/data/api';
import {ITaskResponse} from '@/data/api/types/task.type';
import {socketUpdateList} from '@/data/socket';
import {IndexStep} from '@/utils/constant';

export const kanbanAPIHandler = (data: {[x: number]: ITaskResponse[]}, activeTask: ITaskResponse) => {
  const flatArrr: ITaskResponse[][] = [];
  Object.keys(data).map(x => {
    flatArrr.push(data[Number(x)]);
  });
  console.log(activeTask);

  const mergeTasks = flatArrr.flat(1);
  mergeTasks.forEach((task, idx) => {
    if (task.id == activeTask.id) {
      let newTaskIndex: number | undefined;
      let reindexAll = false;
      const limitDifferenceIndex = 32;
      const listIndex = mergeTasks.map(e => e.index);
      const maxIndex = Math.max(...listIndex);
      const minIndex = Math.min(...listIndex);
      const taskBefore = mergeTasks[idx - 1];
      const taskAfter = mergeTasks[idx + 1];
      if (!taskBefore || !taskAfter) {
        const taskNext = taskBefore || taskAfter;
        const indexNext = Number(taskNext.index);
        if (indexNext === minIndex) newTaskIndex = Math.round(minIndex / 2);
        if (indexNext === maxIndex) newTaskIndex = maxIndex + IndexStep;
        if (newTaskIndex && newTaskIndex <= limitDifferenceIndex) reindexAll = true;
      } else {
        const indexBefore = Number(taskBefore.index);
        const indexAfter = Number(taskAfter.index);
        newTaskIndex = Math.round((indexBefore + indexAfter) / 2);
        if (Math.abs(taskBefore.index - taskAfter.index) < limitDifferenceIndex * 2) reindexAll = true;
      }

      // const resetIndex = () => {
      //   if (reindexAll) api.task.reindexAll({})
      // }
      api.task.update({id: task.id, index: newTaskIndex}).then(socketUpdateList);
    }
  });
};
export const apiUpdateTaskStatus = (id: string, statusId: number) => {
  api.task
    .update({id, statusId})
    .then(() => console.log('Update task column success'))
    .then(() => {
      socketUpdateList();
    });
};
