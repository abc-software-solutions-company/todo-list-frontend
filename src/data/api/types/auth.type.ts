import {IUserResponse} from './user.type';

export interface IAuthLogin {
  name: string;
  email?: string;
}

export type IAuthUpdate = IAuthLogin;

export interface IAuthResponse {
  accessToken: string;
  user: IUserResponse;
}
