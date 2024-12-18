'use client'
import { useGetAuthorBooks } from '@/hooks/books/user-books'
import { GetBookType } from '@/types/book'
import { GlobalRequestParams } from '@/types/global'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
type AuthorBooksProviderProps = {
    children: React.ReactNode
}

export type AuthorBooksContextType = {
    books?: GetBookType[];
    handleSearch?: (searchQuery?: GlobalRequestParams) => void;
    fetchNextPage?: () => void;
    hasNextPage?: boolean;
    fetching?: boolean;
    resetSearch?: () => void;
};

export const AuthorBooksContext = createContext<AuthorBooksContextType>({});

const AuthorProvider = ({ children }: AuthorBooksProviderProps) => {
    const { handleSearch, books, fetchNextPage, hasNextPage, fetching } = useGetAuthorBooks();
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
        <AuthorBooksContext.Provider value={contextValue}>
            {children}
        </AuthorBooksContext.Provider>
    );
};

export default AuthorProvider;

export const useAuthorBooks = () => useContext(AuthorBooksContext);