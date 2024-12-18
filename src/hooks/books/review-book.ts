'use client'
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { addBookReviewApi } from "@/client/requests/books";
import { PostBookReviewRequestType } from "@/types/review";

export const useBookReview = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { showToast } = useToast();
    const { mutate, } = useMutation({
        mutationFn: addBookReviewApi,
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

    const handleBookReview = (data: PostBookReviewRequestType) =>{
        mutate(data);
    }

    return { handleBookReview }
}