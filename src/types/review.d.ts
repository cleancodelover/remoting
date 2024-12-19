import { GetUserType } from "./user";

export interface GlobalApiResponseInterface {
    message: string;
    count: number;
    status: number;
  }
  
  export type GetBookReviewType = {
      id: string;
      user_id: string;
      book_id: string;
      message: string;
      user: GetUserType
    };
  
  
  export type PostBookReviewRequestType = {
      book_id?: string;
      message: string;
    };

    export type PutBookReviewRequestType = {
        _id: string;
        book_id: string;
        message: string;
      };
  
    export interface GetBookReviewsApiResponse extends GlobalApiResponseInterface {
      data: GetReviewType[];
    }
  
    export interface GetBookReviewApiResponse extends GlobalApiResponseInterface {
      data?: GetReviewType | null;
    }