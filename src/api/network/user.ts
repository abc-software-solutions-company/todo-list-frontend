import * as HttpRequest from '@/api/http-request';

export interface IUser {
  user_name?: string;
}

type Users = IAxiosResponse<IUser[]>;
const getUsers = () => HttpRequest.get<Users>('/posts');
const createUser = (data: IUser) => HttpRequest.post<IUser>('/posts', data);

export default {getUsers, createUser};
