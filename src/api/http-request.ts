import {AxiosResponse} from 'axios';

import axiosClient from './axios-client';

const responseBody = (response: AxiosResponse) => response.data;

export function get<T>(url: string) {
  return axiosClient.get<T>(url).then(responseBody);
}

export function post<T>(url: string, data: T) {
  return axiosClient.post<T>(url, data).then(responseBody);
}

export function put<T>(id: string, data: T) {
  return axiosClient.put<T>(id, data).then(responseBody);
}

export function patch<T>(id: string, data: T) {
  return axiosClient.patch<T>(id, data).then(responseBody);
}

export function destroy<T>(id: string) {
  return axiosClient.delete<T>(id).then(responseBody);
}
