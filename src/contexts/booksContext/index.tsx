'use client'
import { useGetBooks } from '@/hooks/books/get-books'
import { useGetAuthorBooks } from '@/hooks/books/user-books'
import { GetBookType } from '@/types/book'
import { GlobalRequestParams } from '@/types/global'
import React, { createContext, useContext, useState } from 'react'

type BooksProviderProps = {
    children: React.ReactNode
}

export type BooksContextType = {
    books?: GetBookType[] | undefined,
    authorBooks?: GetBookType[] | undefined,
    handleSearch?: (searchQuery?: GlobalRequestParams)=>void,
    fetchNextPage?: any,
    authorFetchNextPage?: any,
    hasNextPage?: boolean,
    fetching?: boolean,
    resetSearch?:()=>void
}

export const SearchContext = createContext<BooksContextType>({});
const SearchProvider = ({ children }: BooksProviderProps) =>{
    const { handleSearch, books, fetchNextPage, hasNextPage, fetching} = useGetBooks();
    const { books: authorBooks, fetchNextPage: authorFetchNextPage,  } = useGetAuthorBooks();

    const resetSearch = () =>{
        handleSearch && handleSearch({
            author:undefined,
            category: undefined,
            page:1,
            pages:undefined,
            rating: undefined,
            searchQuery: undefined,
            size: 20,
            year: undefined
        });
    }

    return <SearchContext.Provider value={{handleSearch, books, authorBooks, authorFetchNextPage, fetchNextPage, hasNextPage, fetching, resetSearch}}>
        {children}
    </SearchContext.Provider>

}

export default SearchProvider;
export const useBooks = () => useContext(SearchContext);