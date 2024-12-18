'use client'
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { createUserApi } from "@/client/requests/users";

export const useSignup = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { showToast } = useToast();
    const { mutate, } = useMutation({
        mutationFn: createUserApi,
        onSuccess: async (res) =>{
            showToast({message: res?.data?.message, type:'success'})
            onSuccess && onSuccess();
        },
        onError(error:any, variables, context) {
            onError && onError();
            const errMsg = error?.response?.data?.message
            showToast({message: errMsg, type:'error'})
        },
    });

    const handleSignUp = (data: FormData) =>{
        mutate(data);
    }

    return { handleSignUp }
}