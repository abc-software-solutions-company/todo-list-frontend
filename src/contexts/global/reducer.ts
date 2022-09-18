import {IAction} from './actions';
import {IState} from './state';
import * as types from './types';

export default function reducer(state: IState, action: IAction): IState {
  const {type, payload} = action;

  switch (type) {
    case types.OPEN_MAINMENU:
      return {...state, isMenuOpen: payload.isMenuOpen};
    case types.OPEN_DRAWER:
      return {...state, isDrawerOpen: payload.isDrawerOpen};
    case types.OPEN_MODAL_VIDEO:
      return {...state, isModalVideoOpen: payload.isModalVideoOpen};
    default:
      return state;
  }
}
