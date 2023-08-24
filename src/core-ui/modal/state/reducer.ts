import {IAction, IState, Types} from './types';

export default function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case Types.SET_ACTIVE_MODAL:
      state.activeModal = action.payload;
      return state;
    case Types.SET_COUNT:
      state.count = state.count + action.payload;
      return state;
    default:
      return state;
  }
}
