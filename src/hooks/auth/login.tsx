'use client'
import { loginApi } from "@/client/requests/auth";
import { useAuthentication } from "@/contexts/authContext";
import { LoginRequestType, LoginResponseType } from "@/types/auth";
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";

export const useLogin = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { signIn } = useAuthentication();
    const { showToast } = useToast();
    const { mutate, isPending } = useMutation({
        mutationFn: loginApi,
        onSuccess: async res =>{
            signIn && signIn(res?.data as LoginResponseType);
            showToast({message: res?.data.message, type:'success'})
            onSuccess && onSuccess();
        },
        onError(error:any, variables:LoginRequestType, context) {
            onError && onError();
            const errMsg = error?.response?.data?.message
            showToast({message: errMsg, type:'error'})
        },
    });

    const handleLogin = (data: LoginRequestType) =>{
        mutate(data);
    }

    return { handleLogin, loading: isPending  }
}