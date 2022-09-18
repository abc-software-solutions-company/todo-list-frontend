import {IUser} from '@/api/types/user.type';

export interface IState {
  user?: IUser;
}

const initialState: IState = {};

export default initialState;
