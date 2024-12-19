'use client'
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { updateBookReviewApi } from "@/client/requests/books";
import { PutBookReviewRequestType } from "@/types/review";

export const useUpdateBookReview = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { showToast } = useToast();
    const { mutate, } = useMutation({
        mutationFn: updateBookReviewApi,
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

    const handleBookReviewUpdate = (data: PutBookReviewRequestType) =>{
        mutate(data);
    }

    return { handleBookReviewUpdate }
}