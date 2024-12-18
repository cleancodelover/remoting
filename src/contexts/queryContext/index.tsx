
'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react';
const queryClient = new QueryClient();
type QueryProviderProps = {
    children: React.ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps)=>{
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider;