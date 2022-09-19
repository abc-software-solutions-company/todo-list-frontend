import {IAction} from './actions';
import {IState} from './state';
import * as types from './types';

export default function reducer(state: IState, action: IAction): IState {
  const {type, payload} = action;

  switch (type) {
    case types.LOGIN: {
      return payload;
    }
    default:
      return state;
  }
}
