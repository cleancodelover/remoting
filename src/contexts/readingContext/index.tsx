'use client'
import React, { createContext, useContext, useState } from 'react'

type ReadingProviderProps = {
    children: React.ReactNode
}

export type ReadingContextType = {
    bookUrl?: string,
    setBookUrl?: React.Dispatch<React.SetStateAction<string | undefined>>,
}

export const ReadingContext = createContext<ReadingContextType>({});
const ReadingProvider = ({ children }: ReadingProviderProps) =>{
    const [bookUrl, setBookUrl] = useState<string | undefined>();
    return <ReadingContext.Provider value={{bookUrl, setBookUrl}}>
        {children}
    </ReadingContext.Provider>

}

export default ReadingProvider;
export const useReading = () => useContext(ReadingContext);