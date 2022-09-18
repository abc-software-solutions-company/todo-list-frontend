import {IUser} from '@/api/types/user.type';

import * as types from './types';

interface IActionSetUser {
  type: typeof types.SET_USER;
  payload: {
    user: IUser;
  };
}

export const setUser = (user: IUser): IActionSetUser => {
  return {type: types.SET_USER, payload: {user}};
};

export type IAction = IActionSetUser;
