import {IUserResponse} from './user.type';

export interface INotificationResponse {
  id: string;
  content: string;
  link: string;
  type: string;
  sender: IUserResponse;
  isRead: boolean;
  createdDate: string;
}
