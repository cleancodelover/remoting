import { deleteReview } from "@/services/reviews";
import { httpResponseCodes } from "@/utils/constants";
import { handleResponse } from "@/utils/httpResponseHelpers";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    if (!id) return handleResponse({message: 'Invalid request! Try again.', status: httpResponseCodes.BAD_REQUEST})
    
     const response = await deleteReview(id); 

    return handleResponse(response);
  }