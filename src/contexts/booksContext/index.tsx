'use client'
import { useGetBooks } from '@/hooks/books/get-books'
import { useGetAuthorBooks } from '@/hooks/books/user-books'
import { GetBookType } from '@/types/book'
import { GlobalRequestParams } from '@/types/global'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
type BooksProviderProps = {
    children: React.ReactNode
}

export type BooksContextType = {
    books?: GetBookType[];
    authorBooks?: GetBookType[];
    handleSearch?: (searchQuery?: GlobalRequestParams) => void;
    fetchNextPage?: () => void;
    authorFetchNextPage?: () => void;
    hasNextPage?: boolean;
    fetching?: boolean;
    resetSearch?: () => void;
};

export const BooksContext = createContext<BooksContextType>({});

const BooksProvider = ({ children }: BooksProviderProps) => {
    const { handleSearch, books, fetchNextPage, hasNextPage, fetching } = useGetBooks({});

    const resetSearch = useCallback(() => {
        handleSearch && handleSearch({
            author: undefined,
            category: undefined,
            pages:undefined,
            rating: undefined,
            searchQuery: undefined,
            year: undefined,
            page: 1,
            size: 20
        });
    }, [handleSearch]);

    const contextValue = useMemo(() => ({
        handleSearch,
        books,
        fetchNextPage,
        hasNextPage,
        fetching,
        resetSearch
    }), [handleSearch, books, fetchNextPage, hasNextPage, fetching, resetSearch]);

    return (
        <BooksContext.Provider value={contextValue}>
            {children}
        </BooksContext.Provider>
    );
};

export default BooksProvider;

export const useBooks = () => useContext(BooksContext);