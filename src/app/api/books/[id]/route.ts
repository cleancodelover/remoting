import { deleteBook, getBookById } from "@/services/books";
import { httpResponseCodes } from "@/utils/constants";
import { handleResponse } from "@/utils/httpResponseHelpers";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    if (!id) return handleResponse({status: httpResponseCodes.NO_CONTENT})
      const user = await getBookById(id); 
    return handleResponse({data: user.data, status: httpResponseCodes.HANDLED});
  }

  export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    if (!id) return handleResponse({status: httpResponseCodes.BAD_REQUEST, message: 'Invalid request. Please try again.'})
    
     const response = await deleteBook(id); 

    return handleResponse(response.data);
  }