import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

export interface IUser {
  id?: string;
  userName: string;
}

type User = IAxiosResponse<IUser>;
type Users = IAxiosResponse<IUser[]>;

const getUsers = () => HttpRequest.get<Users>('/users');
const checkUserLogin = (id: string) => HttpRequest.get<User>(`/users/${id}`);
const createUser = (data: IUser) => HttpRequest.post<IUser>('/users', data);

// eslint-disable-next-line import/no-anonymous-default-export
export default {getUsers, checkUserLogin, createUser};
