import { rateBook } from "@/services/ratings";
import { GetBookRatingApiResponse, PostBookRatingRequestType } from "@/types/rating";
import { httpResponseCodes } from "@/utils/constants";
import { handleResponse } from "@/utils/httpResponseHelpers";

export async function POST(req: Request, res: Response) {
  const userId = req.headers.get('user_id');
  if(!userId) return handleResponse({status: httpResponseCodes.UNAUTHORIZED, message: "You have to login to rate any book."});
  
    const rating = await req.json() as PostBookRatingRequestType;
    try {
  
      if (!rating?.book_id || !rating?.quantity)
        return handleResponse({ message: "All fields are required!", status: httpResponseCodes.BAD_REQUEST });
      const response = await rateBook(userId, rating);
      return handleResponse(response);
    } catch (error) {
      console.log("File error :>>>>>>>>>>>>", error);
      return handleResponse({
        status: httpResponseCodes.INTERNAL_SERVER_ERROR,
        message: "There was a problem processing your request",
        count: 0,
        data: null,
      } as GetBookRatingApiResponse);
    }
  }