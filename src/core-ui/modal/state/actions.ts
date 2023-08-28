import {SetActiveModal, SetCount, Types} from './types';

export const setActiveModal = (payload?: string): SetActiveModal => {
  return {type: Types.SET_ACTIVE_MODAL, payload};
};

export const setCount = (payload: number): SetCount => {
  return {type: Types.SET_COUNT, payload};
};
