
export interface GlobalApiResponseInterface {
    message: string;
    count: number;
    status: number;
  }
  
  export type GetBookRatingType = {
      id: string;
      user_id: string;
      book_id: string;
      quantity: number;
    };

    export type GetGeneralBookRatingType = {
      average: number;
      total: number;
    };
  
  
  export type PostBookRatingRequestType = {
      book_id: string;
      quantity: number;
    };
  
    export interface GetBookRatingsApiResponse extends GlobalApiResponseInterface {
      data: GetBookRatingType[];
    }
  
    export interface GetGeneralBookRatingApiResponse extends GlobalApiResponseInterface {
      data: GetGeneralBookRatingType;
    }
  
    export interface GetBookRatingApiResponse extends GlobalApiResponseInterface {
      data?: GetBookRatingType | null;
    }