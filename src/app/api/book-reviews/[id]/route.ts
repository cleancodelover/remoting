import { getBookReviews } from "@/services/reviews";
import { httpResponseCodes } from "@/utils/constants";
import { getQueryParams } from "@/utils/helpers";
import { handleResponse } from "@/utils/httpResponseHelpers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}){
    const queryParams = await req.nextUrl.searchParams;
    const { id } = await params;

      try {
        const query = getQueryParams(queryParams);
        const response = await getBookReviews(id, query);
        return handleResponse(response);
  
      } catch (error) {
        return handleResponse({
          status: httpResponseCodes.INTERNAL_SERVER_ERROR,
          message: "There was a problem processing your request",
          count: 0,
          data: null,
        });
      }
  }