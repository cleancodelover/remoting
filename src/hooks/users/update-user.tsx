'use client'
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { updateUserApi } from "@/client/requests/users";

export const useUpdateUser = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { showToast } = useToast();
    const { mutate, isPending} = useMutation({
        mutationFn: updateUserApi,
        onSuccess: async res =>{
            onSuccess && onSuccess();
            showToast({message: res?.data?.message, type:'success'})
        },
        onError(error:any, variables, context) {
            onError && onError();
            const errMsg = error?.response?.data?.message
            showToast({message: errMsg, type:'error'})
        },
    });

    const handleBookUpdate = (data: FormData) =>{
        mutate(data);
    }

    return { handleBookUpdate, loading: isPending }
}