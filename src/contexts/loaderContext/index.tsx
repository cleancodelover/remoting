
'use client'
import React, { createContext, useContext, useState } from 'react'

type LoaderProviderProps = {
    children: React.ReactNode
}

export type LoaderContextType = {
    loadingTitle?: string | undefined,
    setLoadingTitle?: React.Dispatch<React.SetStateAction<string | undefined>>,
    isLoading?: boolean | undefined,
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean | undefined>>,
}

export const LoaderContext = createContext<LoaderContextType>({});
const LoaderProvider = ({ children }: LoaderProviderProps) =>{
    const [loadingTitle, setLoadingTitle] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    return <LoaderContext.Provider value={{loadingTitle, setLoadingTitle, isLoading, setIsLoading}}>
        {children}
    </LoaderContext.Provider>

}

export default LoaderProvider;
export const useLoader = () => useContext(LoaderContext);