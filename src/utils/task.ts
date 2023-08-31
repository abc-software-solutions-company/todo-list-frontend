import {TaskTypeData} from './constant';

export function getTaskType(type: string) {
  return TaskTypeData.find(x => x.text === type);
}
