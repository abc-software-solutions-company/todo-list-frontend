import {arrayMove as dndKitArrayMove} from '@dnd-kit/sortable';

export const removeAtIndex = (array: string[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: string[], index: number, item: string) => {
  // console.log(array);

  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (array: string[], oldIndex: number, newIndex: number) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};
export const moveBetweenContainers = (
  items: {[x: string]: string[]},
  activeContainer: string | number,
  activeIndex: number,
  overContainer: string | number,
  overIndex: number,
  item: string
) => {
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item)
  };
};
