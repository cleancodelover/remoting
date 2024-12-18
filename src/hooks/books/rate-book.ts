'use client'
import { HookOnErrorType, HookOnSuccessType } from "@/types/global"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useToast from "../notifications/toast";
import { addBookRatingApi } from "@/client/requests/books";
import { GetGeneralBookRatingApiResponse, PostBookRatingRequestType } from "@/types/rating";
import { GetBookApiResponse } from "@/types/book";
import { queryKeys } from "@/utils/react-query/query-keys";

export const useBookRating = (onSuccess?: HookOnSuccessType, onError?: HookOnErrorType) => {
    const { showToast } = useToast();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: addBookRatingApi,
        onMutate: async (data) => {
      
            await queryClient.cancelQueries({
              queryKey: [queryKeys.BOOK_RATINGS, data.book_id],
            });
      
            const rating:any = queryClient.getQueryData([queryKeys.BOOK_RATINGS, data.book_id]);
            if (rating) {
                let rated = rating?.data?.data;
                if(rated){
                    rated.total = (rated.total ?? 0) + 1;
                }else{
                    rated = {average: data.quantity, total: 1};
                }
                rating.data.data = rated;
              queryClient.setQueryData(
                  [data.book_id],
                  (oldData: any) => ({...oldData, rating})
                );
            }
            return { rating };
          },
          onSettled: (response) => {
              queryClient.invalidateQueries({
              queryKey: [queryKeys.BOOK_RATINGS, response?.data?.data?.book_id],
            });
            onSuccess && onSuccess();
          },
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

    return { handleBookRating, loading: isPending }
}