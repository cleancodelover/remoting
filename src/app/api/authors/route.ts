import { getAuthors } from "@/services/users";
import { GetUserApiResponse } from "@/types/user";
import { httpResponseCodes } from "@/utils/constants";
import { handleResponse } from "@/utils/httpResponseHelpers";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest){
      try {
        const response = await getAuthors();
        return handleResponse({data: response.data, status: httpResponseCodes.HANDLED});
  
      } catch (error) {
        return handleResponse({
          status: httpResponseCodes.INTERNAL_SERVER_ERROR,
          message: "There was a problem processing your request",
          count: 0,
          data: null,
        } as GetUserApiResponse);
      }
  }