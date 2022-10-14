export interface IAuthLogin {
  name?: string | undefined;
  email?: string | undefined;
}
export type IAuthUpdate = IAuthLogin;

export interface IAuthInfor extends IAuthLogin {
  id: string;
  name: string;
  email?: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IAuthInfor;
}
