import React, {createContext, useContext, useState} from "react";
import {signIn, useSession} from "next-auth/react";
import SingInMain from "./SingIn";

const UserContext:any = createContext<any>();

export default function MySession({children}:{children: React.ReactNode}){

    const {data : session} = useSession();

    const [data, setData] = useState<any>();
    let state = {
        data: data,
        setData:setData
    }



    if(!session){
        return <SingInMain/>
    }else{
        return<>
            <UserContext.Provider value={state}>
                {children}
            </UserContext.Provider>
        </>
    }
}

export function useAppContext() {
    return useContext(UserContext);
}