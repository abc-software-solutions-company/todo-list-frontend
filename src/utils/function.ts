import {IndexStep, limitDifferenceIndex} from './constant';

export interface IGetNewIndexParams {
  listIndex: number[];
  prevIndex?: number;
  nextIndex?: number;
}

export function shortName(name: string) {
  return name
    .split(' ')
    .map(e => {
      const letter = e[0]?.toUpperCase();
      const char = letter?.charCodeAt(0);
      if (char >= 65 && char <= 90) return letter;
    })
    .join('');
}

export function getnewIndexForDragDrop({listIndex, prevIndex, nextIndex}: IGetNewIndexParams) {
  let newIndex: number | undefined;
  let resetIndex = false;
  const maxIndex = Math.max(...listIndex);
  const minIndex = Math.min(...listIndex);

  if (!prevIndex && !nextIndex) return null;

  if (!prevIndex || !nextIndex) {
    const besideIndex = Number(prevIndex || nextIndex);
    if (besideIndex === minIndex) newIndex = Math.round(minIndex / 2);
    if (besideIndex === maxIndex) newIndex = Number(maxIndex) + IndexStep;
    if (newIndex && newIndex <= limitDifferenceIndex) resetIndex = true;
  } else {
    newIndex = Math.round((Number(prevIndex) + Number(nextIndex)) / 2);
    if (Math.abs(Number(prevIndex) - Number(nextIndex)) < limitDifferenceIndex * 2) resetIndex = true;
  }

  return {
    value: newIndex,
    reset: resetIndex
  };
}
