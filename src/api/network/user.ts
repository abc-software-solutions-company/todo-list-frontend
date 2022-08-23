import * as HttpRequest from '@/api/http-request';

export interface IUsername {
  user_name?: string;
}

const getAllUsers = (): Promise<IUsername[]> => HttpRequest.get<IUsername[]>('/user/get-all');
const createUser = (data: IUsername): Promise<IUsername> => HttpRequest.post<IUsername>('/user/create', data);

export default {
  getAllUsers,
  createUser
};
