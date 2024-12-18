'use client'
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { addBookRatingApi } from "@/client/requests/books";
import { PostBookRatingRequestType } from "@/types/rating";

export const useBookRating = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { showToast } = useToast();
    const { mutate, } = useMutation({
        mutationFn: addBookRatingApi,
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

    const handleBookRating = (data: PostBookRatingRequestType) =>{
        mutate(data);
    }

    return { handleBookRating }
}