import { deleteBookApi } from "@/client/requests/books";
import { HookOnMutateType } from "@/types/global";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBook = (id?: string, onMutate?: HookOnMutateType) =>{
    const { data, mutate, isPending, isError, isSuccess} = useMutation({ 
        mutationFn: deleteBookApi,
        onMutate(variables) {
            // process optimistic update
            onMutate && onMutate();
        },
        onError(error, variables, context) {
            console.log("Error :>>>>>>>>>>>>", error);
            const errMsg = error?.message
        },
    });

    const handleDeleteBook = (id: string) =>{
        const shouldDelete = confirm("Are you sure you want to delete this book? It is not recoverable.");
        if(shouldDelete) mutate(id)
    }

    return {
        isSuccess,
        loading: isPending,
        error: isError,
        handleDeleteBook
    }
}