import { deleteUser, getUserById } from "@/services/users";
import { httpResponseCodes } from "@/utils/constants";
import { handleResponse } from "@/utils/httpResponseHelpers";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    if (!id) return handleResponse({message: 'Invalid request. Try again.', status: httpResponseCodes.BAD_REQUEST})
      const user = await getUserById(id); 
    return handleResponse(user);
  }

  export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    if (!id) return handleResponse({message: 'Invalid request! Try again.', status: httpResponseCodes.BAD_REQUEST})
    
     const response = await deleteUser(id); 

    return handleResponse(response);
  }