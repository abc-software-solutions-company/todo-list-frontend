import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

export interface IUser {
  userName: string;
}

type Users = IAxiosResponse<IUser[]>;
const getUsers = () => HttpRequest.get<Users>('/users');
const createUser = (data: IUser) => HttpRequest.post<IUser>('/users', data);

export default {getUsers, createUser};
