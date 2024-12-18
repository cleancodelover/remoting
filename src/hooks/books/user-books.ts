'use client'
import { getAuthorBooksApi } from "@/client/requests/books";
import { GetBookType } from "@/types/book";
import { GlobalRequestParams } from "@/types/global";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetAuthorBooks = (params?: GlobalRequestParams) =>{
    const queryKey = [queryKeys.USER_BOOKS, {...params}];
    console.log("queryKey :>>>>>>>>>>>>>>", queryKey);
    const { data, isPending, isFetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: ({pageParam}: any)=> getAuthorBooksApi({page: pageParam, ...params}),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if(pages !== null){
                return pages?.length + 1;
            }
            return 1;
        }
    });

    const books = data?.pages?.reduce((acc, page)=>{
        acc.count += page?.data?.count;
        acc.data = acc?.data?.concat(page?.data?.data);
        return acc;
    },{
        count:0,
        data: [] as GetBookType[]
    })

    return {
        books: books?.data,
        loading: isPending,
        fetching: isFetching,
        error: isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }
}
