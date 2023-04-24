import {IndexStep, limitDifferenceIndex} from './constant';

export interface IGetNewIndexParams {
  indexList: number[];
  prevIndex?: number;
  nextIndex?: number;
  order?: 'ASC' | 'DESC';
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

export function getnewIndexForDragDrop({indexList, prevIndex, nextIndex, order = 'ASC'}: IGetNewIndexParams) {
  let newIndex = IndexStep;
  let resetIndex = false;
  const bottomIndex = order === 'ASC' ? Math.max(...indexList) : Math.min(...indexList);
  const topIndex = order === 'DESC' ? Math.max(...indexList) : Math.min(...indexList);
  if (!prevIndex && !nextIndex) return {value: newIndex, reset: resetIndex};
  if (!prevIndex && nextIndex) newIndex = Math.round(topIndex / 2);
  if (prevIndex && !nextIndex) newIndex = Number(bottomIndex) + IndexStep;
  if (prevIndex && nextIndex) {
    newIndex = Math.round((Number(prevIndex) + Number(nextIndex)) / 2);
    if (Math.abs(Number(prevIndex) - Number(nextIndex)) < limitDifferenceIndex * 2) resetIndex = true;
  }
  return {value: newIndex, reset: resetIndex};
}
