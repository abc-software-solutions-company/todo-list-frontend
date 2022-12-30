import {IUserResponse} from './user.type';

export interface INotificationResponse {
  id: string;
  content: string;
  link: string;
  type: string;
  before: string;
  after: string;
  sender: IUserResponse;
  recipient: IUserResponse;
  isRead: boolean;
  createdDate: string;
}
