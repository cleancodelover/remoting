'use client'
//#region Imports
import { LoginResponseType } from '@/types/auth';
import { GetUserType } from '@/types/user';
import { removeFromSecureStore, saveToSecureStore, secureKeys } from '@/utils/helpers/secure-store';
import React, { createContext, useContext, useState } from 'react';
//#endregion

type AuthProviderProps = {
    children?: React.ReactNode
}

type AuthContextProps = {
    authUser?: GetUserType,
    session?:any,
    signIn?:(auth: LoginResponseType)=>void,
    signOut?:()=>void
}

export const AuthContext = createContext<AuthContextProps>({});
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authUser, setAuthUser] = useState<GetUserType>();

    const signIn = async (auth: LoginResponseType) =>{
        console.log("auth :>>>>>>>>>>>>>>>", auth);
        if(auth?.data){
            setAuthUser(auth?.data?.user);
            await saveToSecureStore(secureKeys.tokenKey, auth.data?.access_token);
        }
    }

    const signOut = async()=>{
        await removeFromSecureStore(secureKeys.tokenKey);
        setAuthUser(undefined);
    }
   
    return <AuthContext.Provider value={{
        authUser,
        signIn,
        signOut,
    }}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuthentication = () => useContext(AuthContext)