import { LoginResponseType } from "@/types/auth";
import { httpResponseCodes } from "@/utils/constants";
import { handleResponse } from "@/utils/httpResponseHelpers";

export async function GET( req: Request) {
    try {
        return handleResponse({message: "Logged out.", status: httpResponseCodes.HANDLED});
      } catch (error) {
        return handleResponse({
          status: httpResponseCodes.INTERNAL_SERVER_ERROR,
          message: "There was a problem processing your request",
          count: 0,
          data: null,
        } as LoginResponseType);
      }
  }