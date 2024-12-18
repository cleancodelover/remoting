import { getAuthorBooks } from "@/services/books";
import { httpResponseCodes } from "@/utils/constants";
import { getQueryParams } from "@/utils/helpers";
import { handleResponse } from "@/utils/httpResponseHelpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("user_id");
  
  if (!userId)
    return handleResponse({
      message: "Invalid request. Try again.",
      status: httpResponseCodes.BAD_REQUEST,
    });

  const queryParams = await req.nextUrl.searchParams;
  const query = getQueryParams(queryParams);


  const books = await getAuthorBooks(userId, query);
  return handleResponse(books);
}
