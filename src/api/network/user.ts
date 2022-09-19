import * as HttpRequest from '@/api/http-request';
import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IAxiosResponse} from '@/types';

import {IUser} from '../types/user.type';

type User = IAxiosResponse<IUser>;

const getUserProfile = () => HttpRequest.get<User>(`${API_ENDPOINTS.USER}/verify`);
const createUser = (data: IUser) => HttpRequest.post<IUser>(`${API_ENDPOINTS.USER}/login`, data);

// eslint-disable-next-line import/no-anonymous-default-export
export default {getUserProfile, createUser};
