import validateAccess from "@/middlewares/auth";
import { createUser, getUserById, getUsers, updateUser } from "@/services/users";
import {
  GetUserApiResponse,
  PostUserRequestType,
  PutUserRequestType,
} from "@/types/user";
import { httpResponseCodes } from "@/utils/constants";
import { getQueryParams } from "@/utils/helpers";
import {handleResponse} from "@/utils/httpResponseHelpers";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export async function POST(req: Request, res: Response) {
  const formData = (await req.formData()) as any;
  try {
    const user = {
      profile: formData.get("profile"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      isAuthor: formData.get("isAuthor"),
    } as PostUserRequestType;

    if (
      !user?.password ||
      !user?.email ||
      (!user?.firstName && !user?.lastName)
    )
      return handleResponse({ message: "All fields are required!", status: httpResponseCodes.BAD_REQUEST});

    const response = await createUser(user);
    const resp = handleResponse(response);
    console.log("Response :>>>>>>>>>>>", resp);
    return resp;
  } catch (error) {
    console.log("File error :>>>>>>>>>>>>", error);
    return handleResponse({
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: "There was a problem processing your request",
      count: 0,
      data: null,
    } as GetUserApiResponse);
  }
}

export async function PUT(req: NextRequest) {
  const userId = req.headers.get('user_id');
  if(!userId) return handleResponse({status: httpResponseCodes.UNAUTHORIZED, message: "Unauthorized access."});
  const formData = (await req.formData()) as any;

  try {
    const user = {
      profile: formData.get("profile"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      _id: userId,
    } as PutUserRequestType;
    const response = await updateUser(userId, user);
    return handleResponse(response);
  } catch (error) {
    return handleResponse({
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: "There was a problem processing your request",
      count: 0,
      data: null,
    } as GetUserApiResponse);
  }
}

export async function GET(req: NextRequest) {
  // const params = await req.nextUrl.searchParams;
  const userId = req.headers.get('user_id');
  if(!userId) return handleResponse({message: "Unauthorized access!", status: httpResponseCodes.UNAUTHORIZED})
  try {
    // const query = getQueryParams(params);
    const response = await getUserById(userId!);
    return handleResponse(response);
  } catch (error) {
    return handleResponse({
      status: httpResponseCodes.INTERNAL_SERVER_ERROR,
      message: "There was a problem processing your request",
      count: 0,
      data: null,
    } as GetUserApiResponse);
  }
}
