import { deleteBookReviewApi } from "@/client/requests/books";
import { HookOnMutateType } from "@/types/global";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBookReview = (id?: string, onMutate?: HookOnMutateType) =>{
    const { data, isPending, isError, isSuccess} = useMutation({ 
        mutationFn: ()=> deleteBookReviewApi(id),
        onMutate(variables) {
            // process optimistic update
            onMutate && onMutate();
        },
        onError(error, variables, context) {
            console.log("Error :>>>>>>>>>>>>", error);
            const errMsg = error?.message
        },
    });

    return {
        isSuccess,
        loading: isPending,
        error: isError,
    }
}