import { getBookByIdApi } from "@/client/requests/books";
import { GetBookType } from "@/types/book";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetBook = (id?: string) =>{
    const queryKey = [id]
    const { data, isPending, isError} = useQuery({ queryKey:queryKey, queryFn: ()=> getBookByIdApi(id) });

    return {
        book: data?.data?.data as GetBookType,
        loading: isPending,
        error: isError,
    }
}