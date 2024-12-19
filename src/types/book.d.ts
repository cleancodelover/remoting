import { GetBookReviewType } from "./review";

export interface GlobalApiResponseInterface {
  message: string;
  count: number;
  status: number;
}

export type BookRateType = {
  total?:number,
  average?: number
}

export type GetBookType = {
    _id: string;
    title: string;
    author: string;
    description: string;
    pages: number;
    isbn: string;
    unitPrice: string;
    imageUrl: string;
    bookUrl: string;
    year: string;
    reviewCount?: number,
    reviews: GetBookReviewType[]
    rating: BookRateType
  };


export type PostBookRequestType = {
    _id?: string; 
    title: string;
    description: string;
    author: string;
    year: string;
    pages: number;
    isbn: string;
    unitPrice?: string;
    bookCover?: any; 
    bookFile?: any;
  };

  export type PutBookRequestType = {
    _id:string,
    title: string;
    year: string;
    description: string;
    category?: string;
    pages: number;
    isbn: string;
    unitPrice?: string;
    bookCover?: any;
    author: string;
    };

  export interface GetBooksApiResponse extends GlobalApiResponseInterface {
    data: GetBookType[];
  }

  export interface GetBookApiResponse extends GlobalApiResponseInterface {
    data?: GetBookType | null;
  }