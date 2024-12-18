import { getBooksApi } from "@/client/requests/books";
import { GetBookType } from "@/types/book";
import { GlobalRequestParams } from "@/types/global";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export const useGetBooks = (params: GlobalRequestParams = {} as GlobalRequestParams) =>{
    const [queryKey, setQueryKey] = useState([queryKeys.BOOKS, {...params}]);
    
    const { data, isPending, isFetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({pageParam}: any)=> getBooksApi({page: pageParam, ...params}),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if(pages !== null){
                return pages?.length + 1;
            }
            return 1;
        }
    });

    const handleSearch = useCallback((searchQuery?: GlobalRequestParams) =>{
        if(params.searchQuery != searchQuery?.searchQuery){
            params = {...params,...searchQuery};
            console.log("params :>>>>>>>>>>>>>", params);
            setQueryKey([...queryKey,{...params}])
        }
      }, []);

    const books = data?.pages.reduce((acc, page)=>{
        acc.count += page?.data?.count;
        acc.data = acc.data?.concat(page?.data?.data);
        return acc;
    },{
        count:0,
        data: [] as GetBookType[]
    })

    return {
        books:books?.data,
        loading: isPending,
        fetching: isFetching,
        error: isError,
        fetchNextPage,
        handleSearch,
        hasNextPage,
        isFetchingNextPage
    }
}
