
export interface GlobalApiResponseInterface {
  message: string;
  count: number;
  status: number;
}

export type GetUserType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string
  };


export type PostUserRequestType = {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    isAuthor: boolean;
    profile?: any;
  };


  export type PutUserRequestType = {
      firstName: string;
      lastName: string;
      email?:string,
      profile?: any;
    };

  export interface GetUsersApiResponse extends GlobalApiResponseInterface {
    data: GetUserType[];
  }

  export interface GetUserApiResponse extends GlobalApiResponseInterface {
    data?: GetUserType | null;
  }