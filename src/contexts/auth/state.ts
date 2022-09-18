import {IUser} from '@/api/network/user';

export interface IState {
  user?: IUser;
}

const initialState: IState = {};

export default initialState;
