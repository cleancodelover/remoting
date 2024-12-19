import { generateUrlWithParams } from "@/utils/helpers/generate-params";
import { AUTHORS_ENDPONT, USERS_ENDPONT } from "../endpoints";
import { globalHttpClient } from "../http-client";
import { GetUserApiResponse, GetUsersApiResponse } from "@/types/user";

export const getAuthorsApi = async () =>{
    const endpoint = generateUrlWithParams(AUTHORS_ENDPONT);
    const response = await globalHttpClient.get<GetUsersApiResponse>(endpoint);
    return response;
}

export const getUserApi = async () => {
    const response = await globalHttpClient.get<GetUserApiResponse>(USERS_ENDPONT);
    return response;
}

export const createUserApi = async (data: FormData) =>{
    try{
        const response = await globalHttpClient.post<GetUserApiResponse>(USERS_ENDPONT, data, {});
        return response;
    }catch(error){
        console.log("Error :>>>>>>>>>>>>>>>", error)
        throw error;
    }
}

export const updateUserApi = async (data: FormData) =>{
    try{
        const response = await globalHttpClient.put<GetUserApiResponse>(USERS_ENDPONT, data, {});
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}

export const deleteUserApi = async (id: string) =>{
    try {
        const endpoint = `${USERS_ENDPONT}/${id}`;
        const response = await globalHttpClient.delete<GetUserApiResponse>(endpoint);
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}