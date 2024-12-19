import { reviewBook } from "@/services/reviews";
import { GetBookReviewApiResponse, PostBookReviewRequestType } from "@/types/review";
import { httpResponseCodes } from "@/utils/constants";
import { handleResponse } from "@/utils/httpResponseHelpers";

export async function POST(req: Request) {
  const userId = req.headers.get('user_id');
  if(!userId) return handleResponse({status: httpResponseCodes.UNAUTHORIZED, message: "You have to login to review any book."});
  
    const review = await req.json() as PostBookReviewRequestType;
    try {
  
      if (!review?.book_id || !review?.message)
        return handleResponse({ message: "All fields are required!", status: httpResponseCodes.BAD_REQUEST});
  
      const response = await reviewBook(userId, review);
      return handleResponse(response);
    } catch (error) {
      console.log("File error :>>>>>>>>>>>>", error);
      return handleResponse({
        status: httpResponseCodes.INTERNAL_SERVER_ERROR,
        message: "There was a problem processing your request",
        count: 0,
        data: null,
      } as GetBookReviewApiResponse);
    }
  }