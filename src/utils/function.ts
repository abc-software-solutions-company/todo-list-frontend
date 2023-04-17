import {IndexStep, limitDifferenceIndex} from './constant';

export interface IGetNewIndexParams {
  indexList: number[];
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

export function getnewIndexForDragDrop({indexList, prevIndex, nextIndex}: IGetNewIndexParams) {
  let newIndex = IndexStep;
  let resetIndex = false;
  const maxIndex = Math.max(...indexList);
  const minIndex = Math.min(...indexList);
  if (!prevIndex && !nextIndex) return {value: newIndex, reset: resetIndex};
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
