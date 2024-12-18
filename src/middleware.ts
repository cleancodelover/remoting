import authMiddleware from "@/middlewares/auth";
import { NextResponse } from "next/server";
import { httpResponseCodes } from "./utils/constants";

export const config = {
  matcher: ['/api/users/:path', '/api/books', '/api/ratings', '/api/users', '/api/users/books', '/api/reviews', '/api/ratings'],
};

export default async function middleware(request: Request) {
  
  const userId = await authMiddleware(request);
  if (!userId) {
    if(request.url.includes('/api/books') && request.method == 'GET'){
      return NextResponse.next();
    }

    if(request.url.includes('/api/reviews') && request.method == 'GET'){
      return NextResponse.next();
    }

    if(request.url.includes('/api/ratings') && request.method == 'GET'){
      return NextResponse.next();
    }

    return new NextResponse(JSON.stringify({
      message: "Unauthorized",
      status: httpResponseCodes.UNAUTHORIZED,
    }), {
      status: 401,
    });
  }
  const newHeaders = new Headers(request.headers)
  newHeaders.set('user_id', userId);
  return NextResponse.next({
    headers:newHeaders
  });
}