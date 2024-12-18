import { GetUserType } from "./user";

export interface GlobalApiResponseInterface {
  message: string;
  count: number;
  status: number;
}
export type LoginRequestType = {
  email: string;
  password: string;
};

export interface LoginResponseType extends GlobalApiResponseInterface {
  data?: {
    access_token: string;
    user: GetUserType;
  } | null;
}

export interface LogoutResponseType extends GlobalApiResponseInterface {
  data?: null;
}
