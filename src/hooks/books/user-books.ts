'use client'
import { getAuthorBooksApi } from "@/client/requests/books";
import { GetBookType } from "@/types/book";
import { GlobalRequestParams } from "@/types/global";
import { queryKeys } from "@/utils/react-query/query-keys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

export const useGetAuthorBooks = (initialParams?: GlobalRequestParams) =>{
    const [params, setParams] = useState<GlobalRequestParams>(initialParams || {});
    
    const queryKey = useMemo(() => [queryKeys.USER_BOOKS, params], [params]);

    const { 
        data, 
        isPending, 
        isFetching, 
        isError, 
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage 
    } = useInfiniteQuery({
        queryKey, 
        queryFn: ({ pageParam }) => getAuthorBooksApi({ page: pageParam, ...params }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            return pages != null ? pages?.length + 1 : 1; // Avoids infinite requests
        }
    });

    const handleSearch = useCallback((searchQuery?: GlobalRequestParams) => {
        setParams((prevParams) => {
            if (JSON.stringify(prevParams) !== JSON.stringify(searchQuery)) {
                return { ...prevParams, ...searchQuery };
            }
            return prevParams;
        });
    }, []);

    const books = useMemo(() => 
        data?.pages?.reduce((acc, page) => {
            acc.count += page?.data?.count;
            acc.data = acc.data.concat(page?.data?.data);
            return acc;
        }, {
            count: 0,
            data: [] as GetBookType[]
        }), 
        [data]
    );

    return {
        handleSearch,
        books: books?.data,
        loading: isPending,
        fetching: isFetching,
        error: isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }
}
