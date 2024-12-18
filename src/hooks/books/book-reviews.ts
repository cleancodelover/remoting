import { getBookReviewsApi } from "@/client/requests/books";
import { GlobalRequestParams } from "@/types/global";
import { GetBookReviewType } from "@/types/review";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetBookReviews = (book_id:string, params?: GlobalRequestParams) =>{
    const queryKey = [queryKeys.BOOK_REVIEWS, {...params}];
    const { data, isPending, isFetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({pageParam}: any)=> getBookReviewsApi(book_id, {page: pageParam, ...params}),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if(pages !== null){
                return pages?.length + 1;
            }
            return 1;
        }
    });

    const reviews = data?.pages.reduce((acc, page)=>{
        acc.count += page.data.count;
        acc.data = acc.data.concat(page.data.data);
        return acc;
    },{
        count:0,
        data: [] as GetBookReviewType[]
    })

    return {
        reviews:reviews?.data,
        loading: isPending,
        fetching: isFetching,
        error: isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }
}
