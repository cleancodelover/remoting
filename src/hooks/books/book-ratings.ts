import { getBookRatingApi } from "@/client/requests/books";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetBookRatings = (book_id:string) =>{
    const queryKey = [queryKeys.BOOK_RATINGS, book_id];
    const { data, isPending, isError} = useQuery({ queryKey:queryKey, queryFn: ()=> getBookRatingApi(book_id) });


    return {
        rating: data?.data?.data,
        loading: isPending,
        error: isError
    }
}
