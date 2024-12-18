import { LoginRequestType, LoginResponseType, LogoutResponseType } from "@/types/auth";
import { globalHttpClient } from "../http-client";
import { LOG_IN_ENDPONT, LOG_OUT_ENDPONT } from "../endpoints";


export const loginApi = async (data: LoginRequestType) =>{
    try{
        const response = await globalHttpClient.post<LoginResponseType>(LOG_IN_ENDPONT, data, {});
        return response;
    }catch(error){
        console.log("Error :>>>>>>>>>>>>>>>", error)
        throw error;
    }
}

export const logoutApi = async () =>{
    try{
        const response = await globalHttpClient.get<LogoutResponseType>(LOG_OUT_ENDPONT);
        return response;
    } catch (error) {
        console.log("Error :>>>>>>>>>>>>", error)
        throw error;
    }
}