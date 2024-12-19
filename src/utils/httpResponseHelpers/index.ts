import { httpResponseCodes } from "../constants";

export const respondWith200OkJson = (data: any): Response | void => {
    return Response.json({
    ...data,
    success: true,
    message: data.message,
    error: false,
    data: data.data,
    stack: null,
  }, {status: 200});
};

export const respondWith400BadRequest = (
  data: any
): Response | void => {
    return Response.json({
    success: false,
    message: data.message,
    error: true,
    data: null,
    stack: data.stack,
  }, {status: httpResponseCodes.BAD_REQUEST});
};

export const respondWith401Unauthorized = (
  data: any
): Response | void => {
    return Response.json({
    success: false,
    message: data.message,
    error: true,
    data: null,
    stack: null,
  }, {status: httpResponseCodes.UNAUTHORIZED});
};

export const respondWith201Created = (data: any): Response | void => {
  return Response.json({
    success: false,
    message: data.message,
    error: true,
    data: null,
    stack: null,
  }, {status: httpResponseCodes.CREATED});
};

export const respondWith500InternalServerError = (
  data: any
): Response | void => {
  return Response.json({
    success: false,
    message: data.message,
    error: true,
    data: null,
    stack: data.stack,
  }, {status: httpResponseCodes.INTERNAL_SERVER_ERROR});
};

export const respondWith204NoContent = (
  data: any
): Response | void => {
  return Response.json({
    success: false,
    message: data?.message,
    error: true,
    data: null,
    stack: data?.stack,
  }, {status: httpResponseCodes.HANDLED});
};

export const handleResponse = (data:any) =>{
  switch(data.status){
    case httpResponseCodes.HANDLED:
      return respondWith200OkJson(data);
    case httpResponseCodes.BAD_REQUEST:
      return respondWith400BadRequest(data);
    case httpResponseCodes.CREATED:
      return respondWith201Created(data);
    case httpResponseCodes.INTERNAL_SERVER_ERROR:
      return respondWith500InternalServerError(data);
    case httpResponseCodes.NO_CONTENT:
      return respondWith204NoContent(data);
    case httpResponseCodes.UNAUTHORIZED:
      return respondWith401Unauthorized(data);
    default:
      return null
  }
}