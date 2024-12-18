import { GetBookReviewType } from "./review";

export interface GlobalApiResponseInterface {
  message: string;
  count: number;
  status: number;
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
    reviews: GetBookReviewType[]
  };


export type PostBookRequestType = {
    title: string;
    description: string;
    author: string;
    pages: number;
    isbn: string;
    unitPrice?: string;
    bookCover: any;
    bookFile: any
  };

  export type PutBookRequestType = {
    _id:string,
    title: string;
    description: string;
    category: string;
    pages: number;
    isbn: string;
    unitPrice?: string;
    bookCover: any;
    author: string;
    };

  export interface GetBooksApiResponse extends GlobalApiResponseInterface {
    data: GetBookType[];
  }

  export interface GetBookApiResponse extends GlobalApiResponseInterface {
    data?: GetBookType | null;
  }