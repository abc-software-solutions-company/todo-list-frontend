import {arrayMove as dndKitArrayMove} from '@dnd-kit/sortable';

import {ITaskResponse} from '@/data/api/types/task.type';

export const removeItem = (column: ITaskResponse[], item: ITaskResponse) => {
  return column.filter(e => e.id !== item.id);
};

export const insertItem = (column: ITaskResponse[], item: ITaskResponse, order = 0, statusId = 0) => {
  const arr1 = column.slice(0, order);
  const arr2 = column.slice(order);
  item.statusId = statusId;
  return [...arr1, item, ...arr2];
};

export const arrayMove = (array: any, oldIndex: any, newIndex: any) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};

export const moveBetweenContainers = (
  items: {[x: number]: ITaskResponse[]},
  activeContainer: number,
  activeItem: ITaskResponse,
  overContainer: number,
  order: number
) => {
  console.log(activeContainer);

  return {
    ...items,
    [activeContainer]: removeItem(items[activeContainer], activeItem),
    [overContainer]: insertItem(items[overContainer], activeItem, order, overContainer)
  };
};
