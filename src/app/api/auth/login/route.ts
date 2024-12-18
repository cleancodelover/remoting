import { createBook } from "@/services/books";
import { login } from "@/services/users";
import { LoginRequestType, LoginResponseType } from "@/types/auth";
import { httpResponseCodes } from "@/utils/constants";
import { handleResponse } from "@/utils/httpResponseHelpers";

export async function POST( req: Request, res: Response) {
    const auth = await req.json() as LoginRequestType;
    try {
      
        // GetUserApiResponse
        if(!auth?.email || !auth?.password) return handleResponse({message: "All fields are required", status: httpResponseCodes.BAD_REQUEST})
        const response = await login(auth);
        return handleResponse(response);
  
      } catch (error) {
        return handleResponse({
          status: httpResponseCodes.INTERNAL_SERVER_ERROR,
          message: "There was a problem processing your request",
          count: 0,
          data: null,
        } as LoginResponseType);
      }
  }