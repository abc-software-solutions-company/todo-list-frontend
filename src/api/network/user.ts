import * as HttpRequest from '@/api/http-request';

export interface IUser {
  user_name?: string;
}

const getAllUsers = (): Promise<IUser[]> => HttpRequest.get<IUser[]>('/user/get-all');
const createUser = (data: IUser): Promise<IUser> => HttpRequest.post<IUser>('/user/create', data);

export default {
  getAllUsers,
  createUser
};
