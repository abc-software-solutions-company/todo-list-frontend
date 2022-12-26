import {arrayMove as dndKitArrayMove} from '@dnd-kit/sortable';

export const removeAtIndex = (array: any, index: any) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: any, index: any, item: any) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (array: any, oldIndex: any, newIndex: any) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};

export const moveBetweenContainers = (
  items: {[x: string]: any},
  activeContainer: string | number,
  activeIndex: any,
  overContainer: string | number,
  overIndex: any,
  item: any
) => {
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item)
  };
};
