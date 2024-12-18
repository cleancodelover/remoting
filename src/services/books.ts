"use server";

import Book from "@/models/Book";
import User from "@/models/User";
import { GetBookApiResponse, GetBooksApiResponse, PostBookRequestType, PutBookRequestType } from "@/types/book";
import { GlobalRequestParams } from "@/types/global";
import { httpResponseCodes } from "@/utils/constants";
import { ObjectId } from "mongodb";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
const pump = promisify(pipeline);
const path = require('path');
const url = require('url');

export const createBook = async (
  book: PostBookRequestType
): Promise<GetBookApiResponse> => {
  
  try {
    const bookCheck = await Book.findOne().where("isbn").equals(book.isbn);
    if (bookCheck) {
      return {
        data: null,
        status: httpResponseCodes.BAD_REQUEST,
        message: "Book already registered with this ISBN.",
        count: 1,
        success: false,
      } as GetBookApiResponse;
    }

    let imageUrl = "";
    let bookUrl = "";
    if(book?.bookCover){
      const filePath = `./public/books/${Date.now().toString()}${book?.bookCover?.name}`;
      await pump(book?.bookCover?.stream(), fs.createWriteStream(filePath));
      const relativePath = path.relative('./public', filePath);
      imageUrl = new url.URL(relativePath, process.env.NEXT_PUBLIC_APP_URL).href;
    }
    if(book?.bookFile){
      const filePath = `./public/books/${Date.now().toString()}${book?.bookFile?.name}`;
      await pump(book?.bookFile?.stream(), fs.createWriteStream(filePath));
      const relativePath = path.relative('./public', filePath);
      bookUrl = new url.URL(relativePath, process.env.NEXT_PUBLIC_APP_URL).href;
    }
    
    const newBook = new Book({
      ...book,
      imageUrl,
      bookUrl
    });
    const response = await newBook.save();
    return {
      data: response,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBookApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBookApiResponse;
  }
};

export const updateBook = async ( book: PutBookRequestType ): Promise<GetBookApiResponse> => {
  try {
    const check = await Book.findOne({_id: new ObjectId(book._id)});
    if (!check) {
      return {
        data: null,
        status: httpResponseCodes.BAD_REQUEST,
        message: "User doesn't have an account.",
        count: 1,
        success: false,
      } as GetBookApiResponse;
    }

    let imageUrl = check.imageUrl;
    if(book?.bookCover){
      const filePath = `./public/profile/${Date.now().toString()}${book?.bookCover?.name}`;
      await pump(book?.bookCover?.stream(), fs.createWriteStream(filePath));
      const relativePath = path.relative('./public', filePath);
      imageUrl = new url.URL(relativePath, process.env.NEXT_PUBLIC_APP_URL).href;
    }

    check.title = book.title ?? check.title;
    check.description = book.description ?? check.description;
    check.unitPrice = book.unitPrice ?? check.unitPrice;
    check.pages = book.pages ?? check.pages;
    check.isbn = book.isbn ?? check.isbn;
    check.imageUrl = imageUrl;

    const response = await User.updateOne(check);

    if(!response.acknowledged) {
      return {
        data: check,
        status: httpResponseCodes.BAD_REQUEST,
        message: "Unable to update. Please try again!",
        count: 1,
      } as GetBookApiResponse;
    }

    return {
      data: check,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBookApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBookApiResponse;
  }
};

export const getBookById = async (id: string): Promise<GetBookApiResponse> => {
  console.log("id :>>>>>>>>>>>>>>", id);
  try {
    const book = await Book.findOne().where("_id").equals(new ObjectId(id));
    // .populate({
    //   path: 'ratings',
    //   options: {strictPopulate: false}
    // }).populate({
    //   path: 'reviews',
    //   options: {strictPopulate: false}
    // })
    return {
      data: book,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBookApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBookApiResponse;
  }
};

export const deleteBook = async (id: string): Promise<GetBookApiResponse> => {
  try {
    const book = await Book.findOne().where("_id").equals(new ObjectId(id));

    if (!book) {
      return {
        data: null,
        status: httpResponseCodes.HANDLED,
        message: "Success",
        count: 1,
      } as GetBookApiResponse;
    }

    await Book.deleteOne({ _id: book._id });
    return {
      data: book,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBookApiResponse;
  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: null,
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBookApiResponse;
  }
};

export const getBooks = async({searchQuery, author, category, pages, rating, year, size = 20, page = 1 }: GlobalRequestParams): Promise<GetBooksApiResponse> => {
  try {
    const orQuery = [];
    if(searchQuery){
      orQuery.push({ title: { $regex: new RegExp(searchQuery, 'i') } });
      orQuery.push({ description: { $regex: new RegExp(searchQuery, 'i') } });
    }

    if(author){
      orQuery.push({ author: { $regex: new RegExp(author, 'i') } });
    }

    if(year){
      orQuery.push({ year });
    }

    if(pages){
      orQuery.push({ pages });
    }


    const filter = { $or: orQuery };

    const books = await Book.find(filter).skip((page!-1)*size!).limit(size!)
    ;
    
    return {
      data: books,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBooksApiResponse;

  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: [],
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBooksApiResponse;
  }
}

export const getAuthorBooks = async(user_id:string, {searchQuery, author, category, pages, rating, year, size = 20, page = 1 }: GlobalRequestParams): Promise<GetBooksApiResponse> => {
  try {
    const orQuery = [];
    
    if(searchQuery){
      orQuery.push({ title: { $regex: new RegExp(searchQuery, 'i') } });
      orQuery.push({ description: { $regex: new RegExp(searchQuery, 'i') } });
    }

    if(author){
      orQuery.push({ author: { $regex: new RegExp(author, 'i') } });
    }

    if(year){
      orQuery.push({ year });
    }

    if(pages){
      orQuery.push({ pages });
    }


    const filter = { $or: orQuery, $and:[{_id: new ObjectId(user_id)}] };

    const books = await Book.find(filter).skip((page!-1)*size!).limit(size!)
    ;
    
    return {
      data: books,
      status: httpResponseCodes.HANDLED,
      message: "Success",
      count: 1,
    } as GetBooksApiResponse;

  } catch (error: any) {
    console.log("Error here ;>>>>>>>>>>>>>", error);
    return {
      data: [],
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      count: 1,
    } as GetBooksApiResponse;
  }
}
