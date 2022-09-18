import * as HttpRequest from '@/api/http-request';
import {IAxiosResponse} from '@/types';

import {IUser} from '../types/user.type';

type User = IAxiosResponse<IUser>;

const getUserProfile = () => HttpRequest.get<User>('/users/');
const createUser = (data: IUser) => HttpRequest.post<IUser>('/users', data);

// eslint-disable-next-line import/no-anonymous-default-export
export default {getUserProfile, createUser};
