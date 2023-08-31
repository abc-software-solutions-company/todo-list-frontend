export enum Types {
  SET_ACTIVE_MODAL = 'core-ui/modal/SET_ACTIVE_MODAL',
  SET_COUNT = 'core-ui/modal/SET_COUNT'
}

export interface IState {
  activeModal?: string;
  count: number;
}

export type SetActiveModal = {type: typeof Types.SET_ACTIVE_MODAL; payload?: string};
export type SetCount = {type: typeof Types.SET_COUNT; payload: number};

export type IAction = SetActiveModal | SetCount;
