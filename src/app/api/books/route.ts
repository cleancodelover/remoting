import { createBook, getBooks, updateBook } from "@/services/books";
import { GetBookApiResponse, PostBookRequestType, PutBookRequestType } from "@/types/book";
import { httpResponseCodes } from "@/utils/constants";
import { getQueryParams } from "@/utils/helpers";
import {handleResponse} from "@/utils/httpResponseHelpers";
import { NextRequest } from "next/server";

export async function POST( req: Request) {
  const userId = req.headers.get('user_id');
  if(!userId) return handleResponse({status: httpResponseCodes.UNAUTHORIZED, message: "Unauthorized access."});
  
  const formData = (await req.formData()) as any;
  try {
    const book = {
      bookCover: formData.get("bookCover"),
      bookFile: formData.get("bookFile"),
      title: formData.get("title"),
      author: formData.get("author"),
      year: formData.get("year"),
      description: formData.get("description"),
      pages: formData.get("pages"),
      isbn: formData.get("isbn"),
      unitPrice: formData.get("unitPrice")
    } as PostBookRequestType;

      // GetUserApiResponse
      if(!book?.isbn || !book?.title) return handleResponse({message: "Fields marked * are required!", status: httpResponseCodes.BAD_REQUEST})
      const response = await createBook(userId, book);
      return handleResponse(response);

    } catch (error) {
      return handleResponse({
        status: httpResponseCodes.INTERNAL_SERVER_ERROR,
        message: "There was a problem processing your request",
        count: 0,
        data: null,
      } as GetBookApiResponse);
    }
}

export async function PUT(req: NextRequest){
  const userId = req.headers.get('user_id');
  if(!userId) return handleResponse({status: httpResponseCodes.UNAUTHORIZED, message: "Unauthorized access."});
  
  const formData = (await req.formData()) as any;
  try {
    const book = {
      bookCover: formData.get("bookCover"),
      title: formData.get("title"),
      author: formData.get("author"),
      year: formData.get("year"),
      description: formData.get("description"),
      pages: formData.get("pages"),
      isbn: formData.get("isbn"),
      unitPrice: formData.get("unitPrice"),
      _id: formData.get("_id")
    } as PutBookRequestType;

      // GetUserApiResponse
      if(!book?._id) return handleResponse({message: "Couldn't find the specified book. Try again.", status: httpResponseCodes.BAD_REQUEST})
      const response = await updateBook(book);
      return handleResponse(response);

    } catch (error) {
      return handleResponse({
        status: httpResponseCodes.INTERNAL_SERVER_ERROR,
        message: "There was a problem processing your request",
        count: 0,
        data: null,
      } as GetBookApiResponse);
    }
}

export async function GET(req: NextRequest){
  const params = await req.nextUrl.searchParams;
    try {
      const query = getQueryParams(params);
      const response = await getBooks(query);
      return handleResponse({data: response.data, status: httpResponseCodes.HANDLED});

    } catch (error) {
      return handleResponse({
        status: httpResponseCodes.INTERNAL_SERVER_ERROR,
        message: "There was a problem processing your request",
        count: 0,
        data: null,
      } as GetBookApiResponse);
    }
}
