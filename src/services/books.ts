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
import { PipelineStage } from "mongoose";
const pump = promisify(pipeline);
const path = require('path');
const url = require('url');

export const createBook = async (
  user_id: string,
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
      const filePath = `./public/book-images/${Date.now().toString()}${book?.bookCover?.name}`;
      await pump(book?.bookCover?.stream(), fs.createWriteStream(filePath));
      const relativePath = path.relative('./public', filePath);
      imageUrl = new url.URL(relativePath, process.env.NEXT_PUBLIC_APP_URL).href;
    }
    if(book?.bookFile){
      const filePath = `./public/book-images/${Date.now().toString()}${book?.bookFile?.name}`;
      await pump(book?.bookFile?.stream(), fs.createWriteStream(filePath));
      const relativePath = path.relative('./public', filePath);
      bookUrl = new url.URL(relativePath, process.env.NEXT_PUBLIC_APP_URL).href;
    }
    
    const newBook = new Book({
      ...book,
      user_id: new ObjectId(user_id),
      imageUrl,
      year: book.year,
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
      const filePath = `./public/book-images/${Date.now().toString()}${book?.bookCover?.name}`;
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
      data: null,
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
    const matchConditions: any[] = [];

    if (year) {
      matchConditions.push({ year: year });
    }
    if (pages) {
      matchConditions.push({ pages: pages });
    }
    if (searchQuery) {
      matchConditions.push({
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { author: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      });
    }

    const aggregationPipeline: PipelineStage[] = [
      ...(matchConditions.length > 0
        ? [{ $match: { $and: matchConditions } }]
        : []),
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "book_id",
          as: "ratings",
        },
      },
      {
        $addFields: {
          validRatings: {
            $filter: {
              input: "$ratings",
              as: "rating",
              cond: { $gte: ["$$rating.rating", rating] },
            },
          },
        },
      },
      ...(rating ? [{ $match: { "validRatings.0": { $exists: true } } }] : []),
      {
        $project: {
          ratings: 0,
          validRatings: 0,
        },
      },
      {
        $sort: {
          title: 1,
        },
      },
      {
        $skip: (Number(page) - 1) * Number(size),
      },
      {
        $limit: Number(size),
      },
    ];

    const books = await Book.aggregate(aggregationPipeline);

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

    const orFilters = [];

  if (searchQuery) {
    orFilters.push({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { author: { $regex: searchQuery, $options: 'i' } }
      ]
    });
  }

  if (year) {
    orFilters.push({ year: year });
  }

  if (author) {
    orFilters.push({ author: { $regex: author, $options: 'i' } }); // Partial search, case-insensitive
  }

  if (pages) {
    orFilters.push({ pages: pages });
  }


  const matchingFilters:Record<string, any> = { 
    $and: [{ user_id: new ObjectId(user_id) }]
  };

  if (orFilters.length > 0) {
    matchingFilters.$and.push({ $or: orFilters });
  }

    const books = await Book.aggregate([
      {
        $match: matchingFilters
      },
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'book_id',
          as: 'ratings'
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'book_id',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          rating: {
            quantity: { $size: '$ratings' },
            average: { 
              $cond: [
                { $gt: [{ $size: '$ratings' }, 0] }, 
                { $divide: [{ $sum: '$ratings.quantity' }, { $size: '$ratings' }] },
                0
              ]
            }
          },
          reviewCount: { $size: '$reviews' }
        }
      },
      {
        $project: {
          ratings: 0
        }
      },
      {
        $skip: (page!-1)*size!
      },
      {
        $limit: size!
      }
    ]);

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
