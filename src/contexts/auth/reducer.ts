import {IAction} from './actions';
import {IState} from './state';
import * as types from './types';

export default function reducer(state: IState, action: IAction): IState {
  const {type, payload} = action;

  switch (type) {
    case types.SET_USER:
      console.log(type, payload);
      return {...state, user: payload.user};
    default:
      return state;
  }
}
