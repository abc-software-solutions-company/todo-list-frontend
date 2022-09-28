import * as HttpRequest from '@/api/http-request';
import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IAxiosResponse} from '@/types';

import {IEmail} from '../types/email.type';
import {IUser} from '../types/user.type';

type User = IAxiosResponse<IUser>;

const getUserProfile = () => HttpRequest.get<User>(`${API_ENDPOINTS.USER}/verify`);
const createUser = (data: IUser) => HttpRequest.post<IUser>(`${API_ENDPOINTS.USER}/login`, data);
const attachEmail = (data: IEmail) => HttpRequest.post<IEmail>(`${API_ENDPOINTS.USER}/attach_email`, data);

// eslint-disable-next-line import/no-anonymous-default-export
export default {getUserProfile, createUser, attachEmail};
