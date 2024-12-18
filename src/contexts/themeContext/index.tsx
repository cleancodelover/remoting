'use client'
import React, { createContext, useContext, useState } from 'react'

type ThemeProviderProps = {
    children: React.ReactNode
}

export type ThemeContextType = {
    theme?: 'dark' | 'light',
    setTheme?: React.Dispatch<React.SetStateAction<'dark' | 'light'>>,
}

export const ThemeContext = createContext<ThemeContextType>({});
const ThemeProvider = ({ children }: ThemeProviderProps) =>{
    const [theme, setTheme] = useState<'dark' | 'light'>('light');
    return <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>

}

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);