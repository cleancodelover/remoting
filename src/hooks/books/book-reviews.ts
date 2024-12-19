import { getBookReviewsApi } from "@/client/requests/books";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetBookReviews = (book_id:string) =>{
    const queryKey = [queryKeys.BOOK_REVIEWS,  book_id];
    const { data, isPending, isError} = useQuery({ queryKey:queryKey, queryFn: ()=> getBookReviewsApi(book_id) });

    return {
        reviews: data?.data?.data,
        loading: isPending,
        error: isError
    }
}
